from django.db import models
from django.contrib.contenttypes.fields import GenericForeignKey
from django.contrib.contenttypes.models import ContentType
from storages.backends.s3boto3 import S3Boto3Storage

from django.contrib.auth.models import User

from simple_history.models import HistoricalRecords

ZONES = (
    ('EAR-1', 'EAR-1'),
    ('EAR-1SRA', 'EAR-1SRA'),
    ('EAR-1SDAO', 'EAR-1 (Special Design Area Overlay)'),
    ('EAR-2', 'EAR-2'),
    ('EAR-2/TA', 'EAR-2 / TA'),
    ('EAR-3', 'EAR-3'),
    ('A-R', 'A-R'),
    ('B-5P', 'B-5P'),
    ('CC(RES)', 'CC(RES)'),
    ('CC(NONR)', 'CC(NONR)'),
    ('ED', 'ED'),
)

CATEGORIES = (
    ('ROADS', 'Roads'),
    ('OPEN_SPACE', 'Open Space'),
    ('SEWER_CAP', 'Sewer Capacity'),
    ('SEWER_TRANS', 'Sewer Trans.'),
    ('PARK', 'Park'),
    ('STORM_WATER', 'Storm Water'),
)

EXPANSION_AREAS = (
    ('EA-1', 'EA-1'),
    ('EA-2A', 'EA-2A'),
    ('EA-2B', 'EA-2B'),
    ('EA-2A / 2B', 'EA-2A / 2B'),
    ('EA-2C', 'EA-2C'),
    ('EA-3', 'EA-3'),
)

class Note(models.Model):
    is_active = models.BooleanField(default=True)

    user = models.ForeignKey(User, related_name='note')

    content_type = models.ForeignKey(ContentType)
    object_id = models.PositiveIntegerField()
    content_object = GenericForeignKey('content_type', 'object_id')

    note = models.TextField()
    date = models.DateTimeField(auto_now=True)

    history = HistoricalRecords()

    def __str__(self):
        return self.note

class RateTable(models.Model):
    is_active = models.BooleanField(default=False)

    date_created = models.DateField(auto_now_add=True)
    date_modified = models.DateField(auto_now=True)

    created_by = models.ForeignKey(User, related_name='rate_table_created')
    modified_by = models.ForeignKey(User, related_name='rate_table_modified')

    begin_effective_date = models.DateField()
    end_effective_date = models.DateField(blank=True, null=True)

    resolution_number = models.CharField(max_length=200)

    history = HistoricalRecords()

    def __str__(self):
        return self.resolution_number

class Rate(models.Model):
    is_active = models.BooleanField(default=True)
    
    date_created = models.DateField(auto_now_add=True)
    date_modified = models.DateField(auto_now=True)

    created_by = models.ForeignKey(User, related_name='rate_created')
    modified_by = models.ForeignKey(User, related_name='rate_modified')

    rate_table_id = models.ForeignKey(RateTable, related_name='rate')

    expansion_area = models.CharField(max_length=100, choices=EXPANSION_AREAS)
    zone = models.CharField(max_length=100, choices=ZONES)
    category = models.CharField(max_length=100, choices=CATEGORIES)
    rate = models.DecimalField(max_digits=20, decimal_places=2)

    history = HistoricalRecords()

    class Meta:
        unique_together = (('rate_table_id', 'expansion_area', 'zone', 'category'),)

    def __str__(self):
        return self.zone + ': ' + self.category

class MediaStorage(S3Boto3Storage):
    location = 'media'

def model_directory_path(instance, filename):
    instance_name = str(type(instance.file_content_object).__name__)

    return '{0}/{1}'.format(instance_name, filename)

class FileUpload(models.Model):
    upload = models.FileField(upload_to=model_directory_path)
    date = models.DateTimeField(auto_now_add=True)

    file_content_type = models.ForeignKey(ContentType)
    file_object_id = models.PositiveIntegerField()
    file_content_object = GenericForeignKey('file_content_type', 'file_object_id')

    def __str__(self):
        return str(self.upload)
