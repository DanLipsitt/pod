# -*- coding: utf-8 -*-
# Generated by Django 1.9 on 2015-12-16 23:56
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='PrintFile',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('file', models.FileField(upload_to='')),
                ('filename', models.CharField(max_length=256)),
                ('createdAt', models.DateTimeField(auto_now_add=True)),
            ],
        ),
    ]
