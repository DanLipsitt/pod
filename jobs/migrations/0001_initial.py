# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Material',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
            ],
        ),
        migrations.CreateModel(
            name='PrintAssembly',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
            ],
        ),
        migrations.CreateModel(
            name='PrintJob',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
            ],
        ),
        migrations.CreateModel(
            name='PrintPart',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('quantity_needed', models.IntegerField()),
                ('assembly', models.ForeignKey(to='jobs.PrintAssembly')),
                ('material', models.ForeignKey(to='jobs.Material')),
            ],
        ),
        migrations.CreateModel(
            name='SlicedModelFile',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
            ],
        ),
        migrations.CreateModel(
            name='SlicedModelRev',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('rev', models.IntegerField()),
                ('part', models.ForeignKey(to='jobs.PrintPart')),
                ('sliced_model', models.ForeignKey(to='jobs.SlicedModelFile')),
            ],
            options={
                'get_latest_by': 'rev',
            },
        ),
        migrations.CreateModel(
            name='SourceModelFile',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
            ],
        ),
        migrations.AddField(
            model_name='slicedmodelfile',
            name='source_model',
            field=models.ForeignKey(to='jobs.SourceModelFile'),
        ),
        migrations.AddField(
            model_name='printassembly',
            name='job',
            field=models.ForeignKey(to='jobs.PrintJob'),
        ),
        migrations.AlterUniqueTogether(
            name='slicedmodelrev',
            unique_together=set([('part', 'rev')]),
        ),
    ]
