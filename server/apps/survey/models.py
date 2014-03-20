from decimal import Decimal
from django.contrib.auth.models import User
from django.db import models
from django.db.models import Max, Min, Count, Sum
from django.db.models import signals
from django.utils.timezone import utc

import datetime
import uuid
import simplejson
import caching.base

from ordereddict import OrderedDict


def make_uuid():
    return str(uuid.uuid4())

STATE_CHOICES = (
    ('complete', 'Complete'),
    ('terminate', 'Terminate'),
)

REVIEW_STATE_NEEDED = u'needs review'
REVIEW_STATE_FLAGGED = u'flagged'
REVIEW_STATE_ACCEPTED = u'accepted'

REVIEW_STATE_CHOICES = (
    (REVIEW_STATE_NEEDED, u'Needs Review'),
    (REVIEW_STATE_FLAGGED, u'Flagged'),
    (REVIEW_STATE_ACCEPTED, u'Accepted')
)


class Respondant(caching.base.CachingMixin, models.Model):
    uuid = models.CharField(max_length=36, primary_key=True, default=make_uuid, editable=False,
            help_text="Unique ID for the Survey session. This is the primary key. This coulld come from Knowledge Network")
    survey = models.ForeignKey('Survey',
            help_text="The survey that this set of answers belongs to.")
    gfk_returnURL = models.URLField(max_length=500, default=None, null=True, blank=True,
            help_text="Knowledge Network URL for this respondant")
    complete = models.BooleanField(default=False,
            help_text="Flag to determine if this survey has been completed. Set by the client.")
    status = models.CharField(max_length=20, choices=STATE_CHOICES, default=None, null=True, blank=True,
            help_text="Flag to detemine if the respondant was completed or terminated (based on termination question response)")
    review_status = models.CharField(max_length=20, choices=REVIEW_STATE_CHOICES, default=REVIEW_STATE_NEEDED,
            help_text="Flag to signifiy review status")
    review_comment = models.TextField(null=True, blank=True,
            help_text="Free type field for survey reviewer to add a comment")
    last_question = models.CharField(max_length=240, null=True, blank=True,
            help_text="Slug of the last question answer. Mostly used on reports to see where the user stopped")

    # Filtering fields
    vendor = models.CharField(max_length=240, null=True, blank=True,
            help_text="")
    survey_site = models.CharField(max_length=240, null=True, blank=True)
    buy_or_catch = models.CharField(max_length=240, null=True, blank=True)
    how_sold = models.CharField(max_length=240, null=True, blank=True)


    locations = models.IntegerField(null=True, blank=True)

    ts = models.DateTimeField()
    updated_at = models.DateTimeField(auto_now=True, null=True, blank=True)
    email = models.EmailField(max_length=254, null=True, blank=True, default=None)

    surveyor = models.ForeignKey(User, null=True, blank=True)

    csv_row = models.ForeignKey('reports.CSVRow', null=True, blank=True)
    test_data = models.BooleanField(default=False)

    objects = caching.base.CachingManager()

    def __unicode__(self):
        if self.email:
            return "%s" % self.email
        else:
            return "%s" % self.uuid

    def save(self, *args, **kwargs):
        if self.uuid and ":" in self.uuid:
            self.uuid = self.uuid.replace(":", "_")
        if not self.ts:
            self.ts = datetime.datetime.utcnow().replace(tzinfo=utc)
        self.locations = self.location_set.all().count()

        if not self.csv_row:
            # Circular import dodging
            from apps.reports.models import CSVRow
            self.csv_row = CSVRow.objects.create()
        super(Respondant, self).save(*args, **kwargs)
        # Do this after saving so save_related is called to catch
        # all the updated responses.
        self.update_csv_row()

    def update_csv_row(self):
        self.csv_row.json_data = simplejson.dumps(self.generate_flat_dict())
        self.csv_row.save()

    @classmethod
    def get_field_names(cls):
        return OrderedDict((
            ('model-surveyor', 'Surveyor'),
            ('model-timestamp', 'Date of survey'),
            ('model-email', 'Email'),
            ('model-complete', 'Complete'),
            ('model-review-status', 'Review Status'),
        ))

    def generate_flat_dict(self):
        flat = {
            'model-surveyor': self.surveyor.get_full_name() if self.surveyor else '',
            'model-timestamp': str(self.ts),
            'model-email': self.email,
            'model-complete': self.complete,
            'model-review-status': self.get_review_status_display(),
        }

        for response in self.response_set.all().select_related('question'):
            flat.update(response.generate_flat_dict())
        return flat

    @classmethod
    def stats_report_filter(cls, survey_slug, start_date=None,
                            end_date=None, market=None, surveyor=None,
                            status=None):

        qs = cls.objects.filter(survey__slug=survey_slug)

        if start_date is not None:
            qs = qs.filter(ts__gte=start_date)

        if end_date is not None:
            qs = qs.filter(ts__lt=end_date)

        if market is not None:
            qs = qs.filter(survey_site=market)

        if surveyor is not None:
            qs = qs.filter(surveyor__id=surveyor)

        if status is not None:
            qs = qs.filter(review_status=status)

        return qs


class Page(caching.base.CachingMixin, models.Model):
    question = models.ForeignKey('Question', null=True, blank=True)
    survey = models.ForeignKey('Survey', null=True, blank=True)
    objects = caching.base.CachingManager()

    def __unicode__(self):
        if self.survey is not None and self.question is not None:
            return "%s/%s (%d)" % (self.survey.name, self.question.slug, self.question.order)
        elif self.survey is not None:
            return "%s/NA (NA)" % (self.survey.name)
        elif self.question is not None:
            return "NA/%s (%d)" % (self.question.slug, self.question.order) 
        else:
            return "NA/NA (NA)"

    class Meta:
        ordering = ['survey', 'question__order']


class Survey(caching.base.CachingMixin, models.Model):
    name = models.CharField(max_length=254)
    slug = models.SlugField(max_length=254, unique=True)
    questions = models.ManyToManyField('Question', null=True, blank=True, through="Page")
    states = models.CharField(max_length=200, null=True, blank=True)
    anon = models.BooleanField(default=True)
    offline = models.BooleanField(default=False)

    objects = caching.base.CachingManager()

    @property
    def survey_responses(self):
        return self.respondant_set.all().count()

    @property
    def completes(self):
        return self.respondant_set.filter(complete=True).count()

    @property
    def reviews_needed(self):
        return self.respondant_set.filter(review_status=REVIEW_STATE_NEEDED).count()

    @property
    def flagged(self):
        return self.respondant_set.filter(review_status=REVIEW_STATE_FLAGGED).count()

    @property
    def activity_points(self):
        return Location.objects.filter(response__respondant__in=self.respondant_set.filter(complete=True)).count()

    @property
    def response_date_start(self):
        #return self.questions.filter(slug='survey-date').aggregate(date=Min('response__answer_date')).get('date', None)
        return self.respondant_set.all().aggregate(lowest=Min('ts'), highest=Max('ts'))['lowest']

    @property
    def response_date_end(self):
        #return self.questions.filter(slug='survey-date').aggregate(date=Max('response__answer_date')).get('date', None)
        return self.respondant_set.all().aggregate(lowest=Min('ts'), highest=Max('ts'))['highest']

    @property
    def today(self):
        today = datetime.datetime.combine(datetime.date.today(),
                                          datetime.datetime.min.time())
        tomorrow = today + datetime.timedelta(days=1)
        return self.respondant_set.filter(ts__gte=today, ts__lt=tomorrow).count()

    def generate_field_names(self):
        fields = OrderedDict()
        for q in self.questions.all().order_by('order'):
            if q.type == 'grid':
                if q.rows:
                    for row in q.rows.splitlines():
                        row_slug = (row.lower().replace(' ', '-')
                                               .replace('(', '')
                                               .replace(')', '')
                                               .replace('/', ''))
                        field_slug = q.slug + '-' + row_slug
                        field_name = q.label + ' - ' + row
                        fields[field_slug] = field_name
                else:
                    rows = (q.response_set
                             .exclude(gridanswer__row_label__isnull=True)
                             .values_list('gridanswer__row_label',
                                          'gridanswer__row_text')
                             .distinct())
                    for slug, text in rows:
                        fields[q.slug + '-' + slug] = q.label + ' - ' + text
            else:
                fields[q.slug] = q.label
        return fields

    def __unicode__(self):
        return "%s" % self.name


QUESTION_TYPE_CHOICES = (
    ('info', 'Info Page'),
    ('datepicker', 'Date Picker'),
    ('datetimepicker', 'Date & Time Picker'),
    ('timepicker', 'Time Picker'),
    ('grid', 'Grid'),
    ('currency', 'Currency'),
    ('pennies', 'Pennies'),
    ('text', 'Text'),
    ('textarea', 'Text Area'),
    ('single-select', 'Single Select'),
    ('multi-select', 'Multi Select'),
    ('location', 'Location'),
    ('integer', 'Integer'),
    ('number', 'Number'),
    ('auto-single-select', 'Single Select with Autocomplete'),
    ('map-multipoint', 'Map with Multiple Points'),
    ('yes-no', 'Yes/No'),
)


class Option(caching.base.CachingMixin, models.Model):
    text = models.CharField(max_length=254)
    label = models.SlugField(max_length=64)
    type = models.CharField(max_length=20, choices=QUESTION_TYPE_CHOICES, default='integer')
    rows = models.TextField(null=True, blank=True)
    required = models.BooleanField(default=True)
    order = models.IntegerField(null=True, blank=True)
    min = models.IntegerField(default=None, null=True, blank=True)
    max = models.IntegerField(default=None, null=True, blank=True)
    objects = caching.base.CachingManager()

    def __unicode__(self):
        return "%s" % self.text

REPORT_TYPE_CHOICES = (
    ('distribution', 'Distribution'),
    ('heatmap', 'Heatmap'),
    ('heatmap-distribution', 'Heatmap & Distribution'),
)


class Block(caching.base.CachingMixin, models.Model):
    name = models.CharField(max_length=254, null=True, blank=True)
    skip_question = models.ForeignKey('Question', null=True, blank=True,
            help_text="The question who's answer is used to determine whether or not to skip")
    skip_condition = models.CharField(max_length=254, null=True, blank=True,
            help_text="The skip condition. Must start with >, <, !, =")

    def __unicode__(self):
        return "%s" % self.name


class Question(caching.base.CachingMixin, models.Model):
    title = models.TextField()
    label = models.CharField(max_length=254,
            help_text="Short version of title, used as the placeholder text and other places as a label.")
    order = models.IntegerField(default=0,
            help_text="Determines the order the question shows up in the survey")
    slug = models.SlugField(max_length=64,
            help_text="User-entered slug to identify the question, This should be unique for the survey")
    type = models.CharField(max_length=20, choices=QUESTION_TYPE_CHOICES, default='text',
            help_text="The type of question. The front-end uses this to determine UI and how the answer is parsed")
    options = models.ManyToManyField(Option, null=True, blank=True, 
            help_text="DEPRACTED 3/20/2014")
    grid_cols = models.ManyToManyField(Option, null=True, blank=True, related_name="grid_cols",
            help_text="The columns in a grid")
    options_json = models.TextField(null=True, blank=True, 
            help_text="Name of JSON file that contains the options for the question")
    rows = models.TextField(null=True, blank=True,
            help_text="New line seperated options for single select, multi-select, and grid rows.")
    cols = models.TextField(null=True, blank=True,
            help_text="Not currently used")
    info = models.CharField(max_length=254, null=True, blank=True,
            help_text="The name of a file that is used to Angular partial for a question info page")
    
    # map question fields
    zoom = models.IntegerField(null=True, blank=True, 
            help_text="Initial zoom level for type=map-multipoint")
    min_zoom = models.IntegerField(null=True, blank=True, default=10,
            help_text="Minimum zoom level before a point can be taken")
    lat = models.DecimalField(max_digits=10, decimal_places=7, null=True, blank=True,
            help_text="Initial map latitude")
    lng = models.DecimalField(max_digits=10, decimal_places=7, null=True, blank=True,
            help_text="Initial map longitude")

    integer_min = models.IntegerField(default=None, null=True, blank=True,
            help_text="For type=integer")
    integer_max = models.IntegerField(default=None, null=True, blank=True,
            help_text="For type=integer")
    term_condition = models.CharField(max_length=254, null=True, blank=True,
            help_text="""The termination condition. This is used to determine is 
                        the survey should continue. Should start with <, >, =.""")
    skip_question = models.ForeignKey('self', null=True, blank=True, 
            help_text="DEPRACTED 3/20/2014. These are handled in blocks now")
    skip_condition = models.CharField(max_length=254, null=True, blank=True,
            help_text="DEPRACTED 3/20/2014. These are handled in blocks now ")
    blocks = models.ManyToManyField('Block', null=True, blank=True,
            help_text="A collection of questions. Blocks contain skip logic.")

    randomize_groups = models.BooleanField(default=False,
            help_text="Flag to randominze options list. If false, options are displayed in the order specified")
    options_from_previous_answer = models.CharField(max_length=254, null=True, blank=True,
            help_text="Answers from a previuos multi-select question")
    allow_other = models.BooleanField(default=False,
            help_text="Flag to allow for 'Other' options. This will present a free-typed text field to the user.")
    required = models.BooleanField(default=True,
            help_text="Flag to determine wether or not an answer required")
    modalQuestion = models.ForeignKey('self', null=True, blank=True, related_name="modal_question",
            help_text="Embeds this question in modal that is displayed on its parent question. Used mainly for map questions. Should allows for multiple modals.")
    hoist_answers = models.ForeignKey('self', null=True, blank=True, related_name="hoisted",
            help_text="Answer that should be displayed first. Mainly used to bring previuos choices to the top.")
    foreach_question = models.ForeignKey('self', null=True, blank=True, related_name="foreach",
            help_text="DEPRACTED 3/20/2014.")

    # backend stuff
    filterBy = models.BooleanField(default=False,
            help_text="LEGACY - Used in older survey in the dashboard.")
    visualize = models.BooleanField(default=False, help_text="LEGACY - Used in older survey in the dashboard.")
    report_type = models.CharField(max_length=20, choices=REPORT_TYPE_CHOICES, null=True, default=None,
            help_text="LEGACY - Used in older survey in the dashboard.")
    filter_questions = models.ManyToManyField('self', null=True, blank=True,
            help_text="LEGACY - Used in older survey in the dashboard.")

    @property
    def answer_domain(self):
        if self.visualize or self.filterBy:
            answers = self.response_set.all()  # self.response_set.filter(respondant__complete=True)
            if self.type in ['map-multipoint']:
                return LocationAnswer.objects.filter(location__response__in=answers).values('answer').annotate(locations=Count('answer'), surveys=Count('location__respondant', distinct=True))
            else:
                return answers.values('answer').annotate(locations=Sum('respondant__locations'), surveys=Count('answer'))
        else:
            return None

    objects = caching.base.CachingManager()

    def save(self, *args, **kwargs):
        super(Question, self).save(*args, **kwargs)

    class Meta:
        ordering = ['order']

    @property
    def survey_slug(self):
        if self.survey_set.all():
            return self.survey_set.all()[0].slug
        elif self.modal_question.all():
            return self.modal_question.all()[0].survey_set.all()[0].slug + " (modal)"
        else:
            return "NA"

    @property
    def question_types(self):
        return QUESTION_TYPE_CHOICES

    @property
    def report_types(self):
        return REPORT_TYPE_CHOICES

    def get_answer_domain(self, survey, filters=None):
        answers = self.response_set.all()  # self.response_set.filter(respondant__complete=True)
        if self.type in ['map-multipoint']:
            locations = LocationAnswer.objects.filter(location__response__in=answers)
        if filters is not None:
            for filter in filters:
                slug = filter.keys()[0]
                value = filter[slug]
                filter_question = Question.objects.get(slug=slug, survey=survey)

                if self.type in ['map-multipoint']:
                    if filter_question == self:
                        locations = locations.filter(answer__in=value)
                    else:
                        answers = answers.filter(respondant__response_set__in=filter_question.response_set.filter(answer__in=value))
                        locations = locations.filter(location__response__in=answers)
                else:
                    answers = answers.filter(respondant__responses__in=filter_question.response_set.filter(answer__in=value))
        if self.type in ['map-multipoint']:
            return locations.values('answer', 'location__lat', 'location__lng').annotate(locations=Count('answer'), surveys=Count('location__respondant', distinct=True))
        elif self.type in ['multi-select']:
            return (MultiAnswer.objects.filter(response__in=answers)
                                       .values('answer_text')
                                       .annotate(surveys=Count('answer_text')))
        else:
            return (answers.values('answer')
                           .annotate(locations=Sum('respondant__locations'), surveys=Count('answer')))

    def __unicode__(self):
        return "%s/%s/%s/%s (%d)" % (self.survey_slug, self.slug, self.title, self.type, self.order)
        #return "%s/%s" % (self.survey_set.all()[0].slug, self.label)


class LocationAnswer(caching.base.CachingMixin, models.Model):
    answer = models.TextField(null=True, blank=True, default=None)
    label = models.TextField(null=True, blank=True, default=None)
    location = models.ForeignKey('Location')

    def __unicode__(self):
        return "%s/%s" % (self.location.response.respondant.uuid, self.answer)


class Location(caching.base.CachingMixin, models.Model):
    response = models.ForeignKey('Response')
    respondant = models.ForeignKey('Respondant', null=True, blank=True)
    lat = models.DecimalField(max_digits=10, decimal_places=7)
    lng = models.DecimalField(max_digits=10, decimal_places=7)

    def __unicode__(self):
        return "%s/%s/%s" % (self.response.respondant.survey.slug, self.response.question.slug, self.response.respondant.uuid)


class MultiAnswer(caching.base.CachingMixin, models.Model):
    response = models.ForeignKey('Response')
    answer_text = models.TextField()
    answer_label = models.TextField(null=True, blank=True)


class GridAnswer(caching.base.CachingMixin, models.Model):
    response = models.ForeignKey('Response')
    row_text = models.TextField(null=True, blank=True,
            help_text="Row label text. This comes from questions.rows. This is visible to the user")
    row_label = models.TextField(null=True, blank=True,
            help_text="Row label slug. This comes from questions.rows")
    col_text = models.TextField(null=True, blank=True,
            help_text="Column label text. This comes from questions.cols. This is visible to the user")
    col_label = models.TextField(null=True, blank=True,
            help_text="Column label text. This comes from questions.cols")
    answer_text = models.TextField(null=True, blank=True,
            help_text="Answer text for text based answers")
    answer_number = models.DecimalField(max_digits=10, decimal_places=2, null=True, blank=True,
            help_text="Answer value for numeric based answers")

    def __unicode__(self):
        return "%s: %s" % (self.row_text, self.col_text)


class Response(caching.base.CachingMixin, models.Model):
    question = models.ForeignKey(Question, help_text="Question that this response (answer)")
    respondant = models.ForeignKey(Respondant, null=True, blank=True,
            help_text="The collection of responses that this answer belongs to.")
    answer = models.TextField(null=True, blank=True,
            help_text="This is a text representation of the answer. This is used a a simple display, no parsing needed. Populated when the answer is saved")
    answer_number = models.DecimalField(max_digits=10, decimal_places=2, null=True, blank=True,
            help_text="Used for numeric type answer (e.g. integer, currency, number). Populated when the answer is saved")
    answer_raw = models.TextField(null=True, blank=True,
            help_text="The is the raw JSON string. Format depends on the type fo question")
    answer_date = models.DateTimeField(null=True, blank=True,
            help_text="Indexer for user entered date")
    ts = models.DateTimeField(help_text="Client generated timestamp.")
    updated_at = models.DateTimeField(auto_now=True, null=True, blank=True)
    objects = caching.base.CachingManager()

    def save(self, *args, **kwargs):
        if not self.ts:
            self.ts = datetime.datetime.utcnow().replace(tzinfo=utc)
        super(Response, self).save(*args, **kwargs)

    def generate_flat_dict(self):
        flat = {}
        if self.answer_raw:
            if self.question.type in ('info', 'text', 'textarea', 'yes-no',
                                      'single-select', 'auto-single-select',
                                      'map-multipoint', 'pennies', 'timepicker', 'multi-select'):
                flat[self.question.slug] = self.answer
            elif self.question.type in ('currency', 'integer', 'number'):
                flat[self.question.slug] = str(self.answer_number)
            elif self.question.type == 'datepicker':
                flat[self.question.slug] = self.answer_date.strftime('%m/%d/%Y')
            elif self.question.type == 'grid':
                for answer in self.gridanswer_set.all():
                    flat[self.question.slug + '-' + answer.row_label] = answer.answer_text
            else:
                raise NotImplementedError(
                    ('Found unknown question type of {0} while processing '
                     'response id {1}').format(self.question.type, self.id)
                )
            return flat

    def save_related(self):
        if self.answer_raw:
            self.answer = simplejson.loads(self.answer_raw)
            if self.question.type in ['datepicker']:
                self.answer_date = datetime.datetime.strptime(self.answer, '%m/%d/%Y')
            elif self.question.type in ['currency', 'integer', 'number']:
                if isinstance(self.answer, (int, long, float, complex)):
                    self.answer_number = self.answer
                else:
                    self.answer = None
            elif self.question.type in ['auto-single-select', 'single-select', 'yes-no']:

                answer = simplejson.loads(self.answer_raw)
                if answer.get('name'):
                    self.answer = answer['name'].strip()
                elif answer.get('text'):
                    self.answer = answer['text'].strip()
            elif self.question.type in ['auto-multi-select', 'multi-select']:
                answers = []
                self.multianswer_set.all().delete()
                for answer in simplejson.loads(self.answer_raw):
                    if answer.get('name'):
                        answer_text = answer['name'].strip()
                    elif answer.get('text'):
                        answer_text = answer['text'].strip()
                    answers.append(answer_text)
                    answer_label = answer.get('label', None)
                    multi_answer = MultiAnswer(response=self, answer_text=answer_text, answer_label=answer_label)
                    multi_answer.save()
                self.answer = ", ".join(answers)
            elif self.question.type in ['map-multipoint'] and self.id:
                answers = []
                self.location_set.all().delete()
                for point in simplejson.loads(simplejson.loads(self.answer_raw)):
                    answers.append("%s,%s: %s" % (point['lat'], point['lng'], point['answers']))
                    location = Location(lat=Decimal(str(point['lat'])), lng=Decimal(str(point['lng'])), response=self, respondant=self.respondant)
                    location.save()
                    for answer in point['answers'][0]:
                        answer = LocationAnswer(answer=answer['text'], label=answer['label'], location=location)
                        answer.save()
                    location.save()
                self.answer = ", ".join(answers)
            elif self.question.type in ['pennies'] and self.id:
                answers = []
                self.location_set.all().delete()
                for point in simplejson.loads(simplejson.loads(self.answer_raw)):
                    answers.append("%s,%s: %s" % (point['lat'], point['lng'], point['answers']))
                    location = Location(lat=Decimal(str(point['lat'])), lng=Decimal(str(point['lng'])), response=self, respondant=self.respondant)
                    location.save()
                    for answer in point['answers'][0]:
                        answer = LocationAnswer(answer=answer['text'], label=answer['label'], location=location)
                        answer.save()
                    location.save()
                self.answer = ", ".join(answers)
            elif self.question.type == 'grid':
                self.gridanswer_set.all().delete()
                for answer in self.answer:
                    for grid_col in self.question.grid_cols.all():
                        if grid_col.type in ['currency', 'integer', 'number', 'single-select', 'text', 'yes-no']:
                            try:
                                grid_answer = GridAnswer(response=self,
                                    answer_text=answer[grid_col.label.replace('-', '')],
                                    answer_number=answer[grid_col.label.replace('-', '')],
                                    row_label=answer['label'], row_text=answer['text'],
                                    col_label=grid_col.label, col_text=grid_col.text)
                                grid_answer.save()
                            except Exception as e:
                                print "problem with %s in response id %s" % (grid_col.label, self.id)
                                print "not found in", self.answer_raw
                                print e

                        elif grid_col.type == 'multi-select':
                            try:
                                for this_answer in answer[grid_col.label.replace('-', '')]:
                                    print this_answer
                                    grid_answer = GridAnswer(response=self,
                                        answer_text=this_answer,
                                        row_label=answer['label'], row_text=answer['text'],
                                        col_label=grid_col.label, col_text=grid_col.text)
                                    grid_answer.save()
                            except:
                                print "problem with ", answer
                                print e
                        else:
                            print grid_col.type
                            print answer
            question_slug = self.question.slug.replace('-', '_')
            if hasattr(self.respondant, question_slug):
                # Switched to filter and update rather than just modifying and
                # saving. This doesn't trigger post_save, but still updates
                # self.respondant and the related CSVRow object.
                (Respondant.objects.filter(pk=self.respondant.pk)
                                   .update(**{question_slug: self.answer}))
                setattr(self.respondant, question_slug, self.answer)
                self.respondant.save()
                self.respondant.update_csv_row()
            self.save()

    def __unicode__(self):
        if self.respondant and self.question:
            return "%s/%s (%s)" % (self.respondant.survey.slug, self.question.slug, self.respondant.uuid)
        else:
            return "No Respondant"


def save_related(sender, instance, created, **kwargs):
    # save the related objects on initial creation
    if created:
        instance.save_related()

signals.post_save.connect(save_related, sender=Response)
