import datetime
from pprint import pprint

from django.http import JsonResponse
from django.shortcuts import render

from base_storage.models import ObjectSMT
from obj_data.models import MessageObj
from wialon import Wialon

def get_last_mess(req, id_obj):
    lm = MessageObj.objects.filter(object__id=id_obj).order_by('-date').first()
    coords = [lm.lat, lm.lon]
    data = dict()
    data['coords'] = coords
    return JsonResponse(data)


def get_track(req, object_id, tr_start, tr_end):
    tr_start_dt = datetime.datetime.strptime(tr_start,"%Y-%m-%dT%H:%M")
    tr_end_dt = datetime.datetime.strptime(tr_end, "%Y-%m-%dT%H:%M")
    mess = MessageObj.objects.filter(object__id=object_id).filter(date__gte=tr_start_dt).filter(date__lte=tr_end_dt)
    mess_list = [[m.lat, m.lon] for m in mess]
    data = dict()
    data['mess_list'] = mess_list
    return JsonResponse(data)


def load_test_mess(req):
    MessageObj.objects.all().delete()
    wialon = Wialon()
    wialon.sid = "02a5507e655a7d77d3fa89b0ec43d892"

    mess = wialon.messages_load_interval({
        "itemId": 24331921,
        "timeFrom": 1675058400,
        # "timeFrom": 1669822799,
        "timeTo": 1675061100,
        "flags": 0x0000,
        "flagsMask": 0xFF00,
        "loadCount": 0xffffffff
    })
    mess_block = mess['messages']
    # print(mess_block)
    if mess_block:
        for mess in mess_block:
            if 'pos' in mess and mess['pos']:
                if 'x' in mess['pos'] and 'y' in mess['pos']:
                    car = ObjectSMT.objects.get(id=2)
                    new_mess = MessageObj.objects.create(height=10, date=datetime.datetime.fromtimestamp(mess['t']),
                                                         object=car, lon=mess['pos']['x'], lat=mess['pos']['y'])
                    new_mess.save()
                    # print(mess['pos']['x'], mess['pos']['y'])

    return JsonResponse({})
