from rest_framework import serializers
from api.models import Member , NFTProduct

class ApiSerializer(serializers.ModelSerializer):
    class Meta :
        model = Member
        fields = ('id' , 'address','InjoinDate' )

class NFTSerializer(serializers.ModelSerializer):
    class Meta : 
        model = NFTProduct
        fields = '__all__'