from django.db import models
from django.utils import timezone
from base_storage.models import ObjectSMT


class MessageObj(models.Model):
    """
        Сообщения объекта
    """
    date = models.DateTimeField(default=timezone.now, verbose_name='Дата и Время сообщения')
    lon = models.FloatField(verbose_name="Долгота")
    lat = models.FloatField(verbose_name="Широта")
    height = models.FloatField(verbose_name="Высота")
    object = models.ForeignKey(ObjectSMT, on_delete=models.CASCADE, default=None, null=True, verbose_name='Объект СМТ')