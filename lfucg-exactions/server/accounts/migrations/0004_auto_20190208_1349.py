# -*- coding: utf-8 -*-
# Generated by Django 1.11.2 on 2019-02-08 18:49
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('accounts', '0003_profile_is_approval_required'),
    ]

    operations = [
        migrations.AlterField(
            model_name='accountledger',
            name='date_created',
            field=models.DateField(auto_now_add=True),
        ),
        migrations.AlterField(
            model_name='historicalaccountledger',
            name='date_created',
            field=models.DateField(blank=True, editable=False),
        ),
    ]
