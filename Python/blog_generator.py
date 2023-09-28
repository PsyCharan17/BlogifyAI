##main -final
import yake
import requests
import pymongo
import expertai
import os
from os import path
import base64
from wordcloud import WordCloud, STOPWORDS, ImageColorGenerator
from nltk.tokenize import word_tokenize
import nltk
#import pyspark
#from pyspark.sql import SparkSession
# import pandas as pd
import urllib.request
import json
import urllib
# from bs4 import BeautifulSoup
import requests


os.environ["EAI_USERNAME"]='jaya11vibhav@gmail.com' #give account from expert website here
os.environ["EAI_PASSWORD"]='Jayavibhav@123' #give your password from website here
from expertai.nlapi.cloud.client import ExpertAiClient
client=ExpertAiClient()
cluster = pymongo.MongoClient("mongodb+srv://admin:admin123@blogdetails.jxefzix.mongodb.net/?retryWrites=true&w=majority")
db = cluster["test"]
collection = db["blogs"]
API_URL = "https://api-inference.huggingface.co/models/ProsusAI/finbert"
headers = {"Authorization": "Bearer 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"}
#stopwords = nltk.corpus.stopwords.words('english')
#spark = SparkSession.builder.appName('sparkdf').getOrCreate()
file = open("stopwords.txt",'r')
stopwords=file.read().split()
#web scraping for blogs
def extract_text(link):
    r = requests.get(link)
    soup = BeautifulSoup(r.text, 'html.parser')
    results = soup.find_all(['h1', 'p'])
    heading= soup.find(['h1']).text
    text = [result.text for result in results]
    ARTICLE = ' '.join(text)
    r.close()
    #print(heading,"\n",ARTICLE)
    return heading,ARTICLE

#blog from urls
def blog_from_link(link):
    title,body=extract_text(link)
    blog={"title":title,"blogContent":body[:1024]}
    try:
        x = collection.insert_one(blog)
        print("updated mongodb with url title and blog")
    except:
        print("could not update Mongodb")
    blog_data_gen(title)


def sentiment_nlp(text):
    output = client.specific_resource_analysis(
    body={"document": {"text": text}}, 
    params={'language': "en", 'resource': 'sentiment'
        })
    return(output.sentiment.overall)

def update_spark(df):
    df=df[["title",'blogContent']]
    dataframe = spark.createDataFrame(df)
    dataframe.createOrReplaceTempView('table')
    return True

def generate_word_cloud(text,lemmas, file_name):
    text = " ".join(lemmas) + text
    file_name += '.png'
    file_path = os.path.join(os.getcwd(),file_name)
    # Create and generate a word cloud image:
    wordcloud = WordCloud(stopwords=stopwords, background_color="white").generate(text)
    wordcloud.to_file(file_path)
    #print(file_path)
    with open(file_path, "rb") as image_file:
        data = base64.b64encode(image_file.read())
    return data.decode("utf-8")

def emotional_traits(client,text):
    try:
        taxonomy = 'emotional-traits'
        language = 'en'
        traits = {}
        output = client.classification(body={"document": {"text": text}}, params={'taxonomy': taxonomy, 'language': language})
        for category in output.categories:
            traits[category.hierarchy[1]] = category.frequency
    except ExpertAiRequestError:
        print("Couldn't get emotional traits")
    return traits

def behavioral_traits(client, text):
    try:
        taxonomy = 'behavioral-traits'
        language = 'en'
        traits = {}

        output = client.classification(body={"document": {"text": text}}, params={'taxonomy': taxonomy, 'language': language})

        for category in output.categories:
            traits[category.hierarchy[2]] = category.frequency
    except ExpertAiRequestError:
        print("Couldn't get behavioral traits")
    return traits

def query(payload):
    response = requests.post(API_URL, headers=headers, json=payload)
    return response.json()

def blog_data_gen(title):
    #global spark
    #results = collection.find({})
    text=''
    cluster = pymongo.MongoClient("mongodb+srv://admin:admin123@blogdetails.jxefzix.mongodb.net/?retryWrites=true&w=majority")
    db = cluster["test"]
    collection = db["blogs"]

    results = collection.find()
    try:
        for result in results:
            #print(result)
            if(result['title']==title):
                text+=result['blogContent']
            #print(text)
    except:
        print("blog not found")
        return False
    try:
        res=list(results)
        df=pd.DataFrame(res)    
        if update_spark(df)==True:
            print("spark updated")
    except:
        print("could not update spark session")
    
    #getting blog content from spark dataframes
    #spark.sql('SELECT blogContent FROM table WHERE title = "{}"'.format(title))
    #print(text)
    
    #sentiment
    try:
        sentiment = query({"inputs": text,})
        sentiment=sentiment_nlp(text)+100
    except:
        sentiment=100
    #behavioral traits
    b_t=behavioral_traits(client,text)
    #keywords
    kw_extractor = yake.KeywordExtractor()
    keywords = kw_extractor.extract_keywords(text)
    k_1=keywords[:5]
    #emotional triats
    e_t=emotional_traits(client,text)
    #links from lexica
    lemmas=[i[0] for i in k_1]
    #print(lemmas)
    l=[]
    #k_1.insert(0,title)
    #k_2=[i]
    try:
        l=[]
        #print(lemmas)
        for i in lemmas:
            #print(i)
            response = requests.get('https://lexica.art/api/v1/search?q={}'.format(i))
            #print(response)
            lex_req=response.json()
            img=list(lex_req.values())[0][0]['src']
            #print(img)
            l.append(img)
            #print(l)
        # response = requests.get('https://lexica.art/api/v1/search?q={}'.format(title))
        # print(response)
        # lex_req=response.json()
        # img=list(lex_req.values())[0][0]['src']
        # print(img,l)
        # l.insert(0,img)
        # print(l)
    except:
        print("loading generic images")
        l=['https://lexica-serve-encoded-images2.sharif.workers.dev/md/4da8f335-5664-441c-a828-9c3ee8b17ea8',
          'https://lexica-serve-encoded-images2.sharif.workers.dev/md/0088f0a6-eeca-4423-a358-f3aa427ead50',
          'https://lexica-serve-encoded-images2.sharif.workers.dev/md/0854a95e-c477-4b69-8395-5022b8180a09',
          'https://lexica-serve-encoded-images2.sharif.workers.dev/md/252c8302-c62b-4a86-84f1-5a9cc153666c',
          'https://lexica-serve-encoded-images2.sharif.workers.dev/md/48e2abb5-f787-455e-a995-07aa968c072e']
        updatingDoc = collection.update_one({"title":title},{"$set":{"links":l}})
    #word cloud
    #print(lemmas)
    text = " ".join(lemmas) + text
    #print(text)
    #print(lemmas)
    tl=text.split()
    if len(lemmas)==0:
        for i in text.split()[:5]:
            lemmas.append(i)
    #print(lemmas)
    #print(text)
    try:
        w_c=generate_word_cloud(text,lemmas,"wordcloud")
    except:
        print("could not generate word cloud")
    try:
        updatingDoc = collection.update_one({"title":title},{"$set":{"image0":l[0]}})
        updatingDoc = collection.update_one({"title":title},{"$set":{"links":l}})
        updatingDoc = collection.update_one({"title":title},{"$set":{"sentimentAnalysis":sentiment}})
        updatingDoc = collection.update_one({"title":title},{"$set":{"behavioralTraits":b_t}})
        updatingDoc = collection.update_one({"title":title},{"$set":{"emotionalTraits":e_t}})
        updatingDoc = collection.update_one({"title":title},{"$set":{"keywords":lemmas}})
        updatingDoc = collection.update_one({"title":title},{"$set":{"wordCloud":w_c}})
        for i in range(5):
            updatingDoc = collection.update_one({"title":title},{"$set":{"image{}".format(i+1):l[i]}})
        print("done")
    except:
        print("could not update")
    #print("done")
    return True

#blog_from_link("https://huggingface.co/blog/ml-for-games-1")

#print(blog_data_gen("Social Media Marketing"))