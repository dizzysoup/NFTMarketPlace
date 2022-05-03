from dataclasses import field
from rest_framework import serializers
from api.models import Member , NFTProduct , Communcation

class ApiSerializer(serializers.ModelSerializer):
    class Meta :
        model = Member
        fields = ('id' , 'address','InjoinDate' )

class NFTSerializer(serializers.ModelSerializer):
    class Meta : 
        model = NFTProduct
        fields = '__all__'

class CommunitySerializer(serializers.ModelSerializer):
    class Meta :
        model = Communcation
        fields = '__all__'