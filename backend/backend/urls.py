"""backend URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/4.0/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path , re_path
from api import views
from core.views import front

urlpatterns = [
    path('', front,name = "front"),
    path('admin/', admin.site.urls),
    path('login', views.account_chk , name = "Login"),        
   
    path('api/nft',views.nft_insert, name = "NFT POST "),    
    path('api/social_insert' , views.content_insert , name = "Content Insert"),
    path('api/pfp',views.changePFP , name =" Change PFP "),
    path('api/favorite_rank', views.favorite_rank , name = "Favorite Rank "),
    path('api/recommend',views.recommend , name = "Recommend random  "),
    path('api/hot_nft',views.hotnft, name = "Hot NFT "),
    path('api/top_creator',views.topcreator, name = "Top Sales "),
    re_path('api/nftcreator',views.nft_creator, name = "NFT Select by creator ( url key = address) "),
    re_path('api/resell' , views.resell , name = "Resell NFT (POST / GET) "),
    re_path('api/nft_totally' , views.totallynft , name = "Totally for nft by id "),
    re_path('api/nft_title' , views.nft_title , name = "NFT title GET "),
    re_path('api/favorite_count' , views.favorite_count , name = "Favorite count "),
    re_path('api/favorite_chk' , views.favorite_chk, name=" Favorite Check "),    
    re_path('api/favorite',views.personal_favorite, name = "Favorite table "),   
    re_path('api/trans_account', views.transaction_acc , name = " TransactionPage by account  "),
    re_path('api/trans' , views.transaction, name = "transaction view ( get / post )"),    
    re_path('api/collection',views.collection,name = "collection_t (get / post )"),
    re_path('api/account' , views.account, name = " Select Account Or Update Account Profile "),    
    re_path('api/select',views.nft_select , name = "NFT_select"),
    re_path('api/trans_acc', views.transaction_getacc , name= "get transaction distinct buy account "),
    re_path('api/social_select' , views.content_select, name = "Select Content "),
    re_path('api/socialhall/response',views.socialhallresponse , name = "socialhall response select + insert "),
    re_path('api/socialhall/content',views.socialhallcontent, name = "socialhall content select "),
    re_path('api/socialhall',views.socialhallTitle , name = "socialhall title  select + insert "),
    
]
