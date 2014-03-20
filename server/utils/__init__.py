from django.views.generic import TemplateView
from django.http import HttpResponse


from tastypie.api import Api
from tastypie.utils.mime import determine_format, build_content_type

class DirectTemplateView(TemplateView):
    extra_context = None
    def get_context_data(self, **kwargs):
        context = super(self.__class__, self).get_context_data(**kwargs)
        if self.extra_context is not None:
            for key, value in self.extra_context.items():
                if callable(value):
                    context[key] = value()
                else:
                    context[key] = value
        return context


class DocApi(Api):
    
    def top_level(self, request, api_name=None):
        """
        A view that returns a serialized list of all resources registers
        to the ``Api``. Useful for discovery.
        
        Override this to add in docstrings to the top_level list of endpionts. 

        """
        available_resources = {}

        if api_name is None:
            api_name = self.api_name

        for name in sorted(self._registry.keys()):
            resource = self._registry[name]
            fields = resource.fields
            
            available_resources[name] = {
                'list_endpoint': self._build_reverse_url("api_dispatch_list", kwargs={
                    'api_name': api_name,
                    'resource_name': name,
                }),
                'schema': self._build_reverse_url("api_get_schema", kwargs={
                    'api_name': api_name,
                    'resource_name': name,
                }),
                'docstring':self._registry[name].__doc__ or "",
                'fields':[{"name":f, "type":fields[f].__doc__, "help_text":fields[f].help_text} for f in sorted(fields.keys())],
                'filters':[f for f in sorted(resource._meta.filtering.keys())] or ["No filters defined"]
            }

        desired_format = determine_format(request, self.serializer)

        options = {}

        if 'text/javascript' in desired_format:
            callback = request.GET.get('callback', 'callback')

            if not is_valid_jsonp_callback_value(callback):
                raise BadRequest('JSONP callback name is invalid.')

            options['callback'] = callback

        serialized = self.serializer.serialize(available_resources, desired_format, options)
        return HttpResponse(content=serialized, content_type=build_content_type(desired_format))