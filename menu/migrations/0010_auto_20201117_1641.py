# Generated by Django 3.1.2 on 2020-11-17 16:41

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('menu', '0009_auto_20201115_0212'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='addon',
            name='checkbox',
        ),
        migrations.RemoveField(
            model_name='menuitem',
            name='checkbox',
        ),
    ]