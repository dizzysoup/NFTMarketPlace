from asyncio import constants
from curses import curs_set
from dis import findlinestarts
import re
from sqlite3 import connect
import time
from urllib import request
from django.db.models import query
from django.shortcuts import render
from django.db import connection
from rest_framework.decorators import api_view 
from rest_framework import status , viewsets
from rest_framework.response import Response
import api
from api.models import NFTProduct

@api_view(['GET'])
def nft_select(request):    
    id = request.GET.get('id')
    creator = request.GET.get('creator')

    if creator == None :
        query = '''
          select n.* , m.* , (n.num - c.count +1 ) as sale from 
            nft_t n 
            inner join 
            member_t m 
            inner join 
            (select count(*) count , n.id from 
            transaction_t t  , nft_t n where t.nft_id = n.id and n.id = %s) c 
            on c.id = n.id and n.creator = m.address 
        '''
    elif id == None :
        query = '''
            select n.*,m.name from nft_t n  , member_t m
            where n.creator = m.address and n.creator = %s 
        '''   
    try :
        cursor = connection.cursor()
        if creator == None :
            cursor.execute(query , [str(id)] )
        else :
            cursor.execute(query, [str(creator)])
        
        data = cursor.description      
        rows = cursor.fetchall()
        result =  [dict(zip([column[0] for column in data], row))
                for row in rows]
    finally :
        cursor.close()
    return Response(result , status=status.HTTP_200_OK)

# 撈取所有NFT 產品 + filter 條件 ( 分類、狀態 )
@api_view(['GET'])
def nft_title(request):
    try :
        topic = request.GET.get("topic")       
        statuscode = request.GET.get('status') 

        if (statuscode == '0' ) : statusfilter = '> -1' 
        elif (statuscode== '1') : statusfilter = '> 0' 
        elif (statuscode== '2' ) : statusfilter = '= 0'
        else : statusfilter = '< -1'

        if topic == "" : topic = "%%"
        query = '''
            select *from (
                select n.* , count(t.id) -1  as saled from nft_t n 
                inner join 
                transaction_t t 
                on n.id = t.nft_id  and n.topic like %s
                group by n.id ) a 
            where num - saled ''' + statusfilter + '''
             order by date desc 
        '''
        cursor = connection.cursor()             
        cursor.execute(query,[topic])        
        data = cursor.description             
        rows = cursor.fetchall()
        result =  [dict(zip([column[0] for column in data], row))
                for row in rows]
    finally:
        cursor.close()
    return Response(result , status=status.HTTP_200_OK)


# 發布NFT 的調用
# 同時在討論區介面發文
@api_view(['GET','POST'])
def nft_insert(request):
    result = request.data
    NFTProduct.objects.create( 
        title = result["title"] , ipfs = result["ipfs"] , 
        topic = result["topic"] , description = result["description"],
        creator = result["creator"] , price = result["price"],date = time.localtime(),
        num = result["number"])
    try :
        cursor = connection.cursor()
        route = '/assets/' + result["creator"] + '/'
        query = '''
            insert into socialhall_t(releasehash,title,classification,content,date,image, route,nft_id)
            select  %s , 'New NFT Product Minted !! ', %s , '新的NFT產品上架' , now(),%s,%s,id
            from nft_t where ipfs = %s
        '''     
        cursor.execute(query , [result["creator"],result["topic"],result["ipfs"],route,result["ipfs"]]) 
    finally : 
        cursor.close()
    return Response(result , status=status.HTTP_200_OK)

# Create your views here.
@api_view(['GET', 'POST'])
def account_chk(request):    
    account = request.GET.get('account')    
    query = '''
        select *from member_t where address =  %s
    '''    
    try :      
        cursor = connection.cursor()
        cursor.execute(query , [str(account)])        
        data = cursor.description        
        rows = cursor.fetchall()
        result =  [dict(zip([column[0] for column in data], row))
                for row in rows]
        if result == [] :
            query2 = '''
                insert into member_t(injoindate,address) values(now() ,%s)
            '''
            cursor.execute(query2,[str(account)])
            
            cursor.execute(query , [str(account)])
            rows = cursor.fetchall()
            result =  [dict(zip([column[0] for column in data], row))
                   for row in rows]
    finally :
        cursor.close()
    return Response(result,status=status.HTTP_200_OK)
    
# 個人帳戶的更新
@api_view(['GET', 'POST'])
def account(request):
    result = request.data
    if request.method == 'POST' :
        try :
            cursor = connection.cursor()
            account = result['account']
            username = result['username']
            interduction = result['interduction']
            email = result['email']
            query = '''
                update member_t set name = %s ,interduction = %s,email = %s 
                where address = %s 
            '''
            cursor.execute(query , [username,interduction,email,account])
        finally :
            cursor.close()
    elif request.method == 'GET' : 
        try :
            cursor = connection.cursor()
            account = request.GET.get("account")
            query = '''
                select *from member_t where address = %s 
            '''
            cursor.execute(query , [account])
            data = cursor.description      
            rows = cursor.fetchall()
            result =  [dict(zip([column[0] for column in data], row))
                for row in rows]
        finally :
            cursor.close()
    return Response(result , status=status.HTTP_200_OK)

# 討論區的搜尋
@api_view(['GET'])
def content_select(request): 
    creator = request.GET.get("creator")
    
    query = '''
        select *from communcation_t where creator = %s 
    '''
    try :
        cursor = connection.cursor()
        cursor.execute(query ,[str(creator)])
        data = cursor.description      
        rows = cursor.fetchall()
        result =  [dict(zip([column[0] for column in data], row))
                for row in rows]
    finally :
        cursor.close()
        
    return Response(result , status=status.HTTP_200_OK)

@api_view(['GET' , 'POST']) 
def content_insert(request):
    result = request.data
    creator = str(result['creator'])
    content = str(result['content'])
    member = str(result['member'])
    try :
        query = '''
            insert into communcation_t(creator, content , member , date ) values (%s , %s , %s , now() )
        '''
        cursor = connection.cursor()
        cursor.execute(query, [creator , content , member ])
    finally :
        cursor.close()
    return Response(result , status=status.HTTP_200_OK)

# 交易紀錄
@api_view(['GET', 'POST'])
def transaction(request):
    result = request.data 
    if request.method == 'POST':
        try :
            cursor = connection.cursor()
            query = '''
                insert into transaction_t(event,price,fromaddress,toaddress,nft_id,date)
                select %s,%s,%s,%s,id,now() from nft_t order by id desc limit 1                 
            '''
            event = str(result['event'])
            price = str(result['price'])
            fromhash = str(result['fromhash'])
            tohash = str(result['tohash'])            
            cursor.execute(query,[event,price,fromhash,tohash])            
        finally :
            cursor.close()
    if request.method == 'GET' :
        try :
            cursor = connection.cursor()
            id = request.GET.get('id')
            query = '''
                select *from transaction_t where nft_id = %s
            '''            
            cursor.execute(query , [id])
            data = cursor.description   
            rows = cursor.fetchall()           
            result =  [dict(zip([column[0] for column in data], row))
                for row in rows]             
        finally :
            cursor.close()
    return Response(result , status=status.HTTP_200_OK)

@api_view(['GET','POST'])
def transaction_getacc(request):
    creator = request.GET.get("creator")
    query = '''
        select distinct buyhash from transaction_t where creatorhash = %s and buyhash != creatorhash
    '''
    try :
        cursor = connection.cursor()
        cursor.execute(query , [creator])
        data = cursor.description      
        rows = cursor.fetchall()
        result =  [dict(zip([column[0] for column in data], row))
                for row in rows]
      
    finally :
        cursor.close()
    
    return Response(result , status = status.HTTP_200_OK)

# 個人交易歷史紀錄 
@api_view(['GET'])
def transaction_acc(request):  
    if request.method == 'GET' :
        query = '''
            select *from transaction_t t , nft_t n 
            where t.fromaddress = %s or t.toaddress = %s  and t.nft_id = n.id
        '''
        address = request.GET.get("account")     
        
        try : 
            cursor = connection.cursor()
            cursor.execute(query , [address,address])
            data = cursor.description      
            rows = cursor.fetchall()
            result =  [dict(zip([column[0] for column in data], row))
                for row in rows]
        finally :
            cursor.close()

    return Response(result , status = status.HTTP_200_OK)

#社交大廳的討論站Title
@api_view(['GET','POST'])
def socialhallTitle(request):
    result = request.data 
   
    try :
        cursor = connection.cursor()
        if request.method == 'GET' :    
            query = '''
                select *from socialhall_t where classification = %s order by date desc
            '''
                  
            topic = request.GET.get("topic")   
            if topic == "" :
                query = '''
                    select *from socialhall_t order by date desc 
                '''         
                cursor.execute(query) 
            else :
                cursor.execute(query, [topic])
            data = cursor.description      
            rows = cursor.fetchall()
            result =  [dict(zip([column[0] for column in data], row))
                for row in rows]
        elif request.method == 'POST':
            query = '''
                insert into socialhall_t(releasehash,title,classification,content,date)
                values (%s,%s,%s,%s,%s)
            '''
            hash = str(result["releasehash"])
            title = str(result["title"])
            classification = str(result["classification"])
            content = str(result["content"])
            date = str(result["date"])
            cursor.execute(query,[hash,title,classification,content,date])
            print("insert in database sucess!!")
    finally :
        cursor.close()
    return Response(result , status = status.HTTP_200_OK)

#社交大廳討論站回覆訊息詳細
@api_view(['GET','POST'])
def socialhallresponse(request):
    result = request.data   
    try :
        cursor = connection.cursor()
        if request.method == 'GET':
            id = request.GET.get("id")
            query = '''
                select *from socialhall_t where id = %s 
                order by date desc 
            '''
            cursor.execute(query, [id])
            data = cursor.description      
            rows = cursor.fetchall()
            result =  [dict(zip([column[0] for column in data], row))
                for row in rows]
        if request.method == 'POST' :
            query = '''
                insert into socialhallresponse_t(account,content,titleID,date)
                values(%s,%s,%s,%s)
            '''
            account = result["account"]
            content = result["content"]
            date = result["date"]
            id = result["id"]
            cursor.execute(query , [account ,content , id , date ])
            print("insert success!!")
    finally :
        cursor.close()
    
    return Response(result , status = status.HTTP_200_OK)

#回文系統的回文數
@api_view(['GET'])
def socialhallcontent(request):    
    try :
        cursor = connection.cursor()
        id = request.GET.get("id")       
        query = '''
            select *from socialhallresponse_t  s , member_t  m 
            where s.titleID = %s and s.account = m.address
            order by s.id desc 
        '''
        cursor.execute(query , [id])
        data = cursor.description      
        rows = cursor.fetchall()
        result =  [dict(zip([column[0] for column in data], row))
            for row in rows]
    finally :
        cursor.close()
    
    return Response(result , status = status.HTTP_200_OK)

# 蒐集頁面的view
@api_view(['GET','POST'])
def collection(request):
    result = request.data 
    if request.method == 'POST':
        try :
            cursor = connection.cursor()
            query = '''
               insert into collection_t(nft_id , address )
               values(%s,%s)               
            '''
            id = str(result['id'])
            address = str(result['address'])
            cursor.execute(query, [id,address] )
        finally :
            cursor.close()
    if request.method == 'GET' :
        try :
            cursor = connection.cursor()
            query = '''
                select  distinct n.*,c.address from 
                collection_t c , nft_t n 
                where c.nft_id = n.id and c.address  = %s 
            '''
            address = request.GET.get('account')
            cursor.execute(query , [address])
            data = cursor.description      
            rows = cursor.fetchall()
            result =  [dict(zip([column[0] for column in data], row))
                for row in rows]
        finally :
            cursor.close()
    return Response(result , status = status.HTTP_200_OK)

#更換PFP
@api_view(['GET','POST'])
def changePFP(request):
    result = request.data 
    try :
        cursor = connection.cursor()
        query = '''
            update member_t set PFP = %s where address = %s 
        '''
        ipfs = result["ipfs"]
        account = result["account"] ; 
        cursor.execute(query , [ipfs,account])
    finally :
        cursor.close()
    return Response(result , status = status.HTTP_200_OK)

# 個人最喜歡的收藏
@api_view(['GET','POST'])
def personal_favorite(request):
    result = request.data    
    if request.method == 'POST':
        try :
            cursor = connection.cursor()            
            address = result["address"]
            id = result["id"]
            action = result['action']                       
            if (action == False) :                
                query = '''
                    insert into favorite_t(address,nft_id)
                    values(%s,%s)                 
                '''
            else :
                query  = '''
                    delete from favorite_t where address = %s and nft_id = %s 
                '''
            cursor.execute(query , [address,id])
        finally :
            cursor.close()
    elif request.method == 'GET' :
        try :
            cursor = connection.cursor()
            account = request.GET.get("account")
            query = '''
                select *from favorite_t f , nft_t n 
                where f.address = %s and f.nft_id = n.id 
            '''
            cursor.execute(query , [account])
            data = cursor.description      
            rows = cursor.fetchall()
            result =  [dict(zip([column[0] for column in data], row))
                for row in rows]
        finally :
            cursor.close()
    return Response(result , status = status.HTTP_200_OK)

#這個nft的喜愛度數量
@api_view(['GET'])
def favorite_count(request):    
    try :
        cursor = connection.cursor()
        query = '''
            select count(*) as count from favorite_t where nft_id = %s 
        '''
        id = request.GET.get("id")       
        cursor.execute(query , [id])
        data = cursor.description      
        rows = cursor.fetchall()
        result =  [dict(zip([column[0] for column in data], row))
            for row in rows]
        
    finally :
        cursor.close()
    return Response(result , status = status.HTTP_200_OK)

# 檢查這個account 以及這筆nft_id 是否相同
@api_view(['GET'])
def favorite_chk(request):
    try :
        cursor = connection.cursor()
        query = '''
            select *from favorite_t where nft_id = %s and address =  %s 
        '''
        id = request.GET.get("id")
        account = request.GET.get("account")        
        cursor.execute(query,[id,account])
        data = cursor.description      
        rows = cursor.fetchall()
        result =  [dict(zip([column[0] for column in data], row))
            for row in rows]
    finally :
        cursor.close()
    return Response(result , status = status.HTTP_200_OK)

# 喜愛度排名
@api_view(['GET'])
def favorite_rank(request):
    try :
        cursor = connection.cursor()
        query = '''
           select 
           rank() over(order by count(*) desc ) seq
           ,count(*) as count , nft_id , n.*
	       from favorite_t f , nft_t n 
           where f.nft_id = n.id
           group by nft_id order by count desc limit 3
        '''
        cursor.execute(query)
        data = cursor.description 
        rows = cursor.fetchall()
        result = [dict(zip([column[0] for column in data],row))
            for row in rows]
        
    finally :
        cursor.close()
    
    return Response(result , status = status.HTTP_200_OK)

# 隨機推薦
@api_view(['GET'])
def recommend(request):
    try :
        cursor = connection.cursor()
        query = '''
            select *from nft_t n 
            left join 
            (select count(*) heartnum , nft_id  from favorite_t group by nft_id) f 
            on n.id = f.nft_id 
            order by rand() limit 5  ;
        '''
        cursor.execute(query)
        data = cursor.description 
        rows = cursor.fetchall()
        result = [dict(zip([column[0] for column in data],row))
            for row in rows]
    finally:
        cursor.close()

    return Response(result , status = status.HTTP_200_OK)

#賣最多NFT產品的創作者
@api_view(['GET'])
def topcreator(request):
    try :
        cursor = connection.cursor()
        query = '''
            select distinct *,rank() over ( order by nft_id desc ) as seq from nft_t n , member_t m ,
	        (select nft_id , count(*) as count
            from transaction_t group by nft_id order by count(*) desc limit 10 ) t 
		    where n.creator = m.address and t.nft_id = n.id
            order by count desc ;
        '''
        cursor.execute(query)
        data = cursor.description 
        rows = cursor.fetchall()
        result = [dict(zip([column[0] for column in data],row))
            for row in rows]
    finally:
        cursor.close()
    
    return Response(result , status = status.HTTP_200_OK)

# 最熱銷NFT
@api_view(['GET'])
def hotnft(request):
    try :
        cursor = connection.cursor()
        query = '''
            select * , count(*) as count  
            from transaction_t t , nft_t n 
            where t.nft_id = n.id 
            group by nft_id order by count(*) desc limit 1 ;
        '''
        cursor.execute(query)
        data = cursor.description 
        rows = cursor.fetchall()
        result = [dict(zip([column[0] for column in data],row))
            for row in rows]

    finally :
        cursor.close()
    
    return Response(result , status = status.HTTP_200_OK)

