from django.apps import AppConfig


class BaseStorageConfig(AppConfig):
    default_auto_field = 'django.db.models.BigAutoField'
    name = 'base_storage'
