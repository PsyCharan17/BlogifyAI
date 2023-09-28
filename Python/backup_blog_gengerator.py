##main -final
import yake
import requests
import pymongo
import expertai
import os
import time 
from os import path
import base64
from wordcloud import WordCloud, STOPWORDS, ImageColorGenerator

from nltk.tokenize import word_tokenize
import nltk


os.environ["EAI_USERNAME"]='jaya11vibhav@gmail.com' #give account from expert website here
os.environ["EAI_PASSWORD"]='Jayavibhav@123' #give your password from website here
from expertai.nlapi.cloud.client import ExpertAiClient
client=ExpertAiClient()
cluster = pymongo.MongoClient("mongodb+srv://admin:admin123@blogdetails.jxefzix.mongodb.net/?retryWrites=true&w=majority")
db = cluster["test"]
collection = db["blogs"]
API_URL = "https://api-inference.huggingface.co/models/ProsusAI/finbert"
headers = {"Authorization": "Bearer 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"}
# stopwords = nltk.corpus.stopwords.words('english')

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

def query(payload): #Sentiment analysis function
    response = requests.post(API_URL, headers=headers, json=payload)
    return response.json()

def blog_data_gen(title):
    results = collection.find({})
    text=''
    try:
        for result in results:
            #print(result)
            if(result['title']==title):
                text+=result['blogContent']
            #print(text)
    except:
        print("blog not found")
        return False
    #sentiment
    sentiment = query({"inputs": text,})
    time.sleep(0.1)
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
    try:
        for i in k_1:
            response = requests.get('https://lexica.art/api/v1/search?q={}'.format(i))
            lex_req=response.json()
            img=list(lex_req.values())[0][0]['src']
            l.append(img)
        #print(l)
    except:
        print("loading generic images")
        l=['https://lexica-serve-encoded-images2.sharif.workers.dev/md/0088f0a6-eeca-4423-a358-f3aa427ead50',
          'https://lexica-serve-encoded-images2.sharif.workers.dev/md/0854a95e-c477-4b69-8395-5022b8180a09',
          'https://lexica-serve-encoded-images2.sharif.workers.dev/md/252c8302-c62b-4a86-84f1-5a9cc153666c',
          'https://lexica-serve-encoded-images2.sharif.workers.dev/md/48e2abb5-f787-455e-a995-07aa968c072e',
          'https://lexica-serve-encoded-images2.sharif.workers.dev/md/4da8f335-5664-441c-a828-9c3ee8b17ea8']
        updatingDoc = collection.update_one({"title":title},{"$set":{"links":l}})
    #word cloud
    #print(lemmas)
    text = " ".join(lemmas) + text
    #print(text)
    #print(lemmas)
    # w_c=generate_word_cloud(text,lemmas,"wordcloud")
    try:
        updatingDoc = collection.update_one({"title":title},{"$set":{"links":l}})
        updatingDoc = collection.update_one({"title":title},{"$set":{"sentimentAnalysis":sentiment}})
        updatingDoc = collection.update_one({"title":title},{"$set":{"behavioralTraits":b_t}})
        updatingDoc = collection.update_one({"title":title},{"$set":{"emotionalTraits":e_t}})
        updatingDoc = collection.update_one({"title":title},{"$set":{"keywords":lemmas}})
        updatingDoc = collection.update_one({"title":title},{"$set":{"trial":"Its_working (trial)"}})
        updatingDoc = collection.update_one({"title":title},{"$set":{"wordcloud":w_c}})
        print("done")
    except:
        print("could not update")
    return True


#print(blog_data_gen("Premier League"))
