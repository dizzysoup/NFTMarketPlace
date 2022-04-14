# Generated by Django 4.0.1 on 2022-04-12 06:30

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='MemberCard',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('creator', models.TextField()),
                ('nft_id', models.IntegerField()),
            ],
            options={
                'db_table': 'membercard_t',
            },
        ),
    ]
