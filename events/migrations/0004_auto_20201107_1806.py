# Generated by Django 3.1.2 on 2020-11-07 18:06

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('events', '0003_auto_20201107_1806'),
    ]

    operations = [
        migrations.AlterField(
            model_name='events',
            name='day',
            field=models.CharField(default='', max_length=255),
        ),
        migrations.AlterField(
            model_name='events',
            name='event',
            field=models.CharField(default='', max_length=255),
        ),
    ]
