# -*- coding: utf-8 -*-
# Generated by Django 1.11.2 on 2018-12-07 15:42
from __future__ import unicode_literals

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion
import notes.models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('contenttypes', '0002_remove_content_type_name'),
    ]

    operations = [
        migrations.CreateModel(
            name='FileUpload',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('upload', models.FileField(upload_to=notes.models.model_directory_path)),
                ('date', models.DateTimeField(auto_now_add=True)),
                ('file_object_id', models.PositiveIntegerField()),
                ('file_content_type', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='contenttypes.ContentType')),
            ],
        ),
        migrations.CreateModel(
            name='HistoricalNote',
            fields=[
                ('id', models.IntegerField(auto_created=True, blank=True, db_index=True, verbose_name='ID')),
                ('is_active', models.BooleanField(default=True)),
                ('object_id', models.PositiveIntegerField()),
                ('note', models.TextField()),
                ('date', models.DateTimeField(blank=True, editable=False)),
                ('history_id', models.AutoField(primary_key=True, serialize=False)),
                ('history_date', models.DateTimeField()),
                ('history_change_reason', models.CharField(max_length=100, null=True)),
                ('history_type', models.CharField(choices=[('+', 'Created'), ('~', 'Changed'), ('-', 'Deleted')], max_length=1)),
                ('content_type', models.ForeignKey(blank=True, db_constraint=False, null=True, on_delete=django.db.models.deletion.DO_NOTHING, related_name='+', to='contenttypes.ContentType')),
                ('history_user', models.ForeignKey(null=True, on_delete=django.db.models.deletion.SET_NULL, related_name='+', to=settings.AUTH_USER_MODEL)),
                ('user', models.ForeignKey(blank=True, db_constraint=False, null=True, on_delete=django.db.models.deletion.DO_NOTHING, related_name='+', to=settings.AUTH_USER_MODEL)),
            ],
            options={
                'verbose_name': 'historical note',
                'ordering': ('-history_date', '-history_id'),
                'get_latest_by': 'history_date',
            },
        ),
        migrations.CreateModel(
            name='HistoricalRate',
            fields=[
                ('id', models.IntegerField(auto_created=True, blank=True, db_index=True, verbose_name='ID')),
                ('is_active', models.BooleanField(default=True)),
                ('date_created', models.DateField(blank=True, editable=False)),
                ('date_modified', models.DateField(blank=True, editable=False)),
                ('expansion_area', models.CharField(choices=[('EA-1', 'EA-1'), ('EA-2A', 'EA-2A'), ('EA-2B', 'EA-2B'), ('EA-2A / 2B', 'EA-2A / 2B'), ('EA-2C', 'EA-2C'), ('EA-3', 'EA-3')], max_length=100)),
                ('zone', models.CharField(choices=[('EAR-1', 'EAR-1'), ('EAR-1SRA', 'EAR-1SRA'), ('EAR-1SDAO', 'EAR-1 (Special Design Area Overlay)'), ('EAR-2', 'EAR-2'), ('EAR-2/TA', 'EAR-2 / TA'), ('EAR-3', 'EAR-3'), ('A-R', 'A-R'), ('B-5P', 'B-5P'), ('CC(RES)', 'CC(RES)'), ('CC(NONR)', 'CC(NONR)'), ('ED', 'ED')], max_length=100)),
                ('category', models.CharField(choices=[('ROADS', 'Roads'), ('OPEN_SPACE', 'Open Space'), ('SEWER_CAP', 'Sewer Capacity'), ('SEWER_TRANS', 'Sewer Trans.'), ('PARK', 'Park'), ('STORM_WATER', 'Storm Water')], max_length=100)),
                ('rate', models.DecimalField(decimal_places=2, max_digits=20)),
                ('history_id', models.AutoField(primary_key=True, serialize=False)),
                ('history_date', models.DateTimeField()),
                ('history_change_reason', models.CharField(max_length=100, null=True)),
                ('history_type', models.CharField(choices=[('+', 'Created'), ('~', 'Changed'), ('-', 'Deleted')], max_length=1)),
                ('created_by', models.ForeignKey(blank=True, db_constraint=False, null=True, on_delete=django.db.models.deletion.DO_NOTHING, related_name='+', to=settings.AUTH_USER_MODEL)),
                ('history_user', models.ForeignKey(null=True, on_delete=django.db.models.deletion.SET_NULL, related_name='+', to=settings.AUTH_USER_MODEL)),
                ('modified_by', models.ForeignKey(blank=True, db_constraint=False, null=True, on_delete=django.db.models.deletion.DO_NOTHING, related_name='+', to=settings.AUTH_USER_MODEL)),
            ],
            options={
                'verbose_name': 'historical rate',
                'ordering': ('-history_date', '-history_id'),
                'get_latest_by': 'history_date',
            },
        ),
        migrations.CreateModel(
            name='HistoricalRateTable',
            fields=[
                ('id', models.IntegerField(auto_created=True, blank=True, db_index=True, verbose_name='ID')),
                ('is_active', models.BooleanField(default=False)),
                ('date_created', models.DateField(blank=True, editable=False)),
                ('date_modified', models.DateField(blank=True, editable=False)),
                ('begin_effective_date', models.DateField()),
                ('end_effective_date', models.DateField(blank=True, null=True)),
                ('resolution_number', models.CharField(max_length=200)),
                ('history_id', models.AutoField(primary_key=True, serialize=False)),
                ('history_date', models.DateTimeField()),
                ('history_change_reason', models.CharField(max_length=100, null=True)),
                ('history_type', models.CharField(choices=[('+', 'Created'), ('~', 'Changed'), ('-', 'Deleted')], max_length=1)),
                ('created_by', models.ForeignKey(blank=True, db_constraint=False, null=True, on_delete=django.db.models.deletion.DO_NOTHING, related_name='+', to=settings.AUTH_USER_MODEL)),
                ('history_user', models.ForeignKey(null=True, on_delete=django.db.models.deletion.SET_NULL, related_name='+', to=settings.AUTH_USER_MODEL)),
                ('modified_by', models.ForeignKey(blank=True, db_constraint=False, null=True, on_delete=django.db.models.deletion.DO_NOTHING, related_name='+', to=settings.AUTH_USER_MODEL)),
            ],
            options={
                'verbose_name': 'historical rate table',
                'ordering': ('-history_date', '-history_id'),
                'get_latest_by': 'history_date',
            },
        ),
        migrations.CreateModel(
            name='Note',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('is_active', models.BooleanField(default=True)),
                ('object_id', models.PositiveIntegerField()),
                ('note', models.TextField()),
                ('date', models.DateTimeField(auto_now=True)),
                ('content_type', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='contenttypes.ContentType')),
                ('user', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='note', to=settings.AUTH_USER_MODEL)),
            ],
        ),
        migrations.CreateModel(
            name='Rate',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('is_active', models.BooleanField(default=True)),
                ('date_created', models.DateField(auto_now_add=True)),
                ('date_modified', models.DateField(auto_now=True)),
                ('expansion_area', models.CharField(choices=[('EA-1', 'EA-1'), ('EA-2A', 'EA-2A'), ('EA-2B', 'EA-2B'), ('EA-2A / 2B', 'EA-2A / 2B'), ('EA-2C', 'EA-2C'), ('EA-3', 'EA-3')], max_length=100)),
                ('zone', models.CharField(choices=[('EAR-1', 'EAR-1'), ('EAR-1SRA', 'EAR-1SRA'), ('EAR-1SDAO', 'EAR-1 (Special Design Area Overlay)'), ('EAR-2', 'EAR-2'), ('EAR-2/TA', 'EAR-2 / TA'), ('EAR-3', 'EAR-3'), ('A-R', 'A-R'), ('B-5P', 'B-5P'), ('CC(RES)', 'CC(RES)'), ('CC(NONR)', 'CC(NONR)'), ('ED', 'ED')], max_length=100)),
                ('category', models.CharField(choices=[('ROADS', 'Roads'), ('OPEN_SPACE', 'Open Space'), ('SEWER_CAP', 'Sewer Capacity'), ('SEWER_TRANS', 'Sewer Trans.'), ('PARK', 'Park'), ('STORM_WATER', 'Storm Water')], max_length=100)),
                ('rate', models.DecimalField(decimal_places=2, max_digits=20)),
                ('created_by', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='rate_created', to=settings.AUTH_USER_MODEL)),
                ('modified_by', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='rate_modified', to=settings.AUTH_USER_MODEL)),
            ],
        ),
        migrations.CreateModel(
            name='RateTable',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('is_active', models.BooleanField(default=False)),
                ('date_created', models.DateField(auto_now_add=True)),
                ('date_modified', models.DateField(auto_now=True)),
                ('begin_effective_date', models.DateField()),
                ('end_effective_date', models.DateField(blank=True, null=True)),
                ('resolution_number', models.CharField(max_length=200)),
                ('created_by', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='rate_table_created', to=settings.AUTH_USER_MODEL)),
                ('modified_by', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='rate_table_modified', to=settings.AUTH_USER_MODEL)),
            ],
        ),
        migrations.AddField(
            model_name='rate',
            name='rate_table_id',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='rate', to='notes.RateTable'),
        ),
        migrations.AddField(
            model_name='historicalrate',
            name='rate_table_id',
            field=models.ForeignKey(blank=True, db_constraint=False, null=True, on_delete=django.db.models.deletion.DO_NOTHING, related_name='+', to='notes.RateTable'),
        ),
        migrations.AlterUniqueTogether(
            name='rate',
            unique_together=set([('rate_table_id', 'expansion_area', 'zone', 'category')]),
        ),
    ]
