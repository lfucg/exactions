# -*- coding: utf-8 -*-
# Generated by Django 1.11.2 on 2017-11-01 19:35
from __future__ import unicode_literals

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('notes', '0013_auto_20171019_1245'),
    ]

    operations = [
        migrations.AlterUniqueTogether(
            name='rate',
            unique_together=set([('rate_table_id', 'expansion_area', 'zone', 'category')]),
        ),
    ]