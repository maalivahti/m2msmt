from . import views
from django.conf.urls import url

urlpatterns = [
    url(r'^get_last_mess/(?P<id_obj>\d+)/$', views.get_last_mess, name='get_last_mess'),
    url(r'^get_track/(?P<object_id>\d+)/(?P<tr_start>\d{4}-\d{2}-\d{2}T\d{2}:\d{2})/(?P<tr_end>\d{4}-\d{2}-\d{2}T\d{2}:\d{2})/$', views.get_track, name='get_track'),
    url(r'^load_test_mess/$', views.load_test_mess, name="load_test_mess")
]