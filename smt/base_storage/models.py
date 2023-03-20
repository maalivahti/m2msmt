from django.db import models


class AccountSMT(models.Model):
    """
        Учетная запись компании
    """
    name = models.CharField(max_length=20, verbose_name='Наименование уч. записи')


class ProfileSMT(models.Model):
    """
        Профиль пользователя
    """
    name = models.CharField(max_length=20, verbose_name='Наименование профиля')


class ObjectSMT(models.Model):
    """
        Объект СМТ
    """
    name = models.CharField(max_length=20, verbose_name='Наименование объекта')
    icon = models.URLField(default="https://hst-api.wialon.com/avl_library_image/5/0/library/unit/s_g_6.svg", verbose_name='Иконка')