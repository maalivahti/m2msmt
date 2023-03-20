import json

from django.http import JsonResponse
from django.shortcuts import render
from django.template.loader import render_to_string
from django.views.decorators.csrf import csrf_exempt

from base_storage.models import ObjectSMT


def index(request):
    data = dict()
    obj_list = ObjectSMT.objects.all()
    context = {'obj_list': obj_list}
    template = 'index.html'
    return render(request, template, context)


def objects_list(requset):
    data = dict()
    obj_list = list(ObjectSMT.objects.all().values())
    data['objList'] = obj_list
    return JsonResponse(data)


def add_elem_to_list(request, elem_id):
    data = dict()
    print('elem_id: ', elem_id)
    elem = ObjectSMT.objects.filter(id=elem_id).first()
    context = {'elem': elem}
    data['html_data'] = render_to_string('work_list/obj_work_item.html', context)
    return JsonResponse(data)


@csrf_exempt
def get_obj_data_list(request):
    objList = json.loads(request.body)['workList']
    print('objList: ', objList)
    data = dict()
    ctx = {"obj_list": ObjectSMT.objects.filter(id__in=objList)}
    data['page_data'] = render_to_string('work_list/obj_work_objects.html', ctx, request)
    return JsonResponse(data)


def nav(request, page):
    data = dict()
    obj_list = ObjectSMT.objects.all()
    context = {'obj_list': obj_list}

    if page == 'list':
        data['page_data'] = render_to_string('work_list/obj_work_list.html', context)

    elif page == 'track':
        data['page_data'] = render_to_string('track/track.html', context)

    return JsonResponse(data)
