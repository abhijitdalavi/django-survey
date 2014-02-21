from django.core.management.base import BaseCommand

from places.models import Place


import csv

excluded_types = ["Airport", "Building", "Cemetery", "Crossing", "Locale",
                  "Census", "Church", "Civil", "Hospital", "Summit", "Tower",
                  "Military", "Mine", "School", "Post Office", "Tunnel", "Well"]


class Command(BaseCommand):
    args = '<gnis text file>'
    help = 'Load places data'

    def handle(self, *args, **options):
        reader = csv.DictReader(open(args[0]), delimiter='|')
        rows = 0
        for row in reader:
            #if rows > 1000:
            #    break
            try:
                rows += 1
                kwargs = {
                    'type': row['FEATURE_CLASS'].decode("utf-8").encode('utf-8'),
                    #'name': row['FEATURE_NAME'].decode("utf-8").encode('ascii', 'ignore'),
                    'name': row['FEATURE_NAME'].decode("utf-8").encode('utf-8'),
                    'state': row['STATE_ALPHA'].decode("utf-8").encode('utf-8'),
                    'county': row['COUNTY_NAME'].decode("utf-8").encode('utf-8'),
                    'lat': row['PRIM_LAT_DEC'].decode("utf-8").encode('utf-8'),
                    'lng': row['PRIM_LONG_DEC'].decode("utf-8").encode('utf-8')
                }

                if kwargs['type'] not in excluded_types:
                    place, created = Place.objects.get_or_create(type=kwargs['type'], name=kwargs['name'], state=kwargs['state'], county=kwargs['county'])
                    place.lat = kwargs['lat']
                    place.lng = kwargs['lng']
                    place.save()
            except:
                import pdb
                pdb.set_trace()
        print Place.objects.all().count()
