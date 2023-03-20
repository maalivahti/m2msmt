from . import views
from django.conf.urls import url

urlpatterns = [
    url(r'^$', views.index, name='index'),
    url(r'^nav/(?P<page>\D+)/$', views.nav, name='nav'),
    url(r'^add_elem_to_list/(?P<elem_id>\d+)/$', views.add_elem_to_list, name='add_elem_to_list'),
    url(r'^get_obj_data_list/$', views.get_obj_data_list, name='get_obj_data_list'),
    url(r'^objects_list/$', views.objects_list, name='objects_list'),
]
