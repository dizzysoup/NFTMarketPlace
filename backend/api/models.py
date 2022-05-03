from pyexpat import model
from tkinter.tix import Tree
from django.db import models

# Create your models here.
class Member(models.Model):
    address = models.CharField(max_length=128 , blank = True , null = False) # 帳戶位址
    name = models.TextField(null = True , blank = False) # 帳戶名稱
    interduction = models.TextField(null = True) #個人介紹
    email = models.EmailField(null = True ) # email 
    PFP = models.TextField(null = True ) #個人PFP頁面
    InjoinDate = models.DateField(auto_now_add=True , null = True )

    class Meta : 
        db_table = "member_t"

# nft 清單
class NFTProduct(models.Model):
    title = models.TextField(null = True ) # nft 名稱
    ipfs = models.TextField(null = False) # nft ipfs 
    creator = models.CharField(max_length=128 , blank = True ,null = False ) # nft 創作者
    topic = models.CharField(max_length=10 , blank=True , null = False)    # nft 分類
    num = models.IntegerField(null = True, ) # nft 數量
    description = models.TextField(null = False ) # nft 描述
    price = models.IntegerField(null = True) # nft 價格
    royalties = models.IntegerField(null = False , default = "10") # 創作者抽成    
    date = models.DateField(auto_now_add=True , null = True ) # nft deployed 時間
    
    class Meta:
        db_table = "nft_t"

# 0xCommunity 會員討論室的留言資料庫
class Communcation(models.Model):
    nft_id  = models.IntegerField() ## 討論室id，同時也是該NFT產品的 ID
    member = models.CharField(max_length=128, blank=True, null = False) ## 留言者的address   
    content = models.TextField(null = False) ## 留言內容
    date  = models.DateField(auto_now_add=True , null = True ) ## 發布日期

    class Meta: 
        db_table = "communcation_t"

#交易紀錄資料表
class Transaction(models.Model):    
    event = models.TextField(null = False) #此筆交易的事件
    price = models.FloatField(null = False) #交易的價格
    fromaddress = models.TextField(null = False ) #向誰交易
    toaddress = models.TextField(null = False ) # 交易者
    nft_id = models.IntegerField(null = False) # 交易nft_id (外來鍵)
    date = models.DateField(auto_now_add = True) #交易日期

    class Meta:
        db_table = "transaction_t"

socialtype_choices = (
    ("PFP" , "PFP"),
    ("ArtWork" , "ArtWork"),
    ("Music","Music"),
    ("Game","Game")
)

#社交討論站的討論區
class SocialHall(models.Model):
    releasehash = models.TextField(null = False) # 發布者
    title = models.TextField(null = False) # 標題    
    classification = models.CharField(max_length=9, choices=socialtype_choices , default= "PFP") # 分類
    content = models.TextField(null = True) # 留言內容   
    image = models.TextField(null = True ) # 是否有圖片
    route = models.TextField(null = True ) # 是否有連結
    nft_id = models.IntegerField(null = True) # NFT 外來鍵
    date = models.TextField(null = True) # 留言日期
    class Meta :
        db_table = "SocialHall_t"

class SocialHallResponse(models.Model):
    account = models.TextField(null = False ) #發文帳號
    content = models.TextField(null = True) # 留言內容
    titleID = models.IntegerField() # 外來鍵 連結title 
    date = models.TextField(null = True) # 留言日期

    class Meta :
        db_table = "SocialHallResponse_t"

#帳戶蒐集資料表
class Collection(models.Model):
    nft_id = models.IntegerField() #所持有的 nft_id 
    address = models.TextField(null = False) #帳戶   

    class Meta : 
        db_table = 'Collection_t'

#喜愛度資料表
class Favorate(models.Model):
    address = models.TextField(null = False) #帳戶
    nft_id = models.IntegerField() #按讚的 nft_id
    
    class Meta:
        db_table = "Favorite_t"

#轉賣資料表
class Resell(models.Model):
    address = models.TextField(null = False) #轉賣帳戶
    nft_id = models.IntegerField() # 轉賣的nft_id
    price = models.FloatField() #轉賣價格

    class Meta :
        db_table = "Resell_t"

# 抽成資料表
class Royaltie(models.Model):
    address = models.TextField(null = False) # 轉賣帳戶
    nft_id = models.IntegerField() # 轉賣的NFT
    royalties = models.IntegerField() # 抽成價格
    class Meta :
        db_table = "royalties_t"

