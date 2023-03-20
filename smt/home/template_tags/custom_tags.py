import datetime
from django.template.defaulttags import register
from base_storage.models import ObjectSMT


@register.filter
def get_name_obj(id_obj):
    return ObjectSMT.objects.get(id=id_obj).name


@register.filter
def get_icon_obj(id_obj):
    return ObjectSMT.objects.get(id=id_obj).icon


@register.filter
def get_main_params(id_obj):
    data = {'lot': "Широта",
            'lon': "Долгота",
            'speed': 30,
            'mill': 1000}
    return data.items()


@register.filter
def get_sens_param(id_obj):
    data = { 'key1': "value1",
             'key2': "value2",
             'key3': "value3",
             'key4': "value4"}
    return data.items()