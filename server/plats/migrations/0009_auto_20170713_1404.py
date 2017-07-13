# -*- coding: utf-8 -*-
# Generated by Django 1.11.2 on 2017-07-13 18:04
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('plats', '0008_auto_20170713_1333'),
    ]

    operations = [
        migrations.AlterField(
            model_name='historicalplat',
            name='buildable_lots',
            field=models.IntegerField(),
        ),
        migrations.AlterField(
            model_name='historicalplat',
            name='non_buildable_lots',
            field=models.IntegerField(),
        ),
        migrations.AlterField(
            model_name='plat',
            name='buildable_lots',
            field=models.IntegerField(),
        ),
        migrations.AlterField(
            model_name='plat',
            name='non_buildable_lots',
            field=models.IntegerField(),
        ),
    ]
