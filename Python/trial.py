import requests
import json

blogInfo = {"title": "Mercedes Benz"}
# print(type(blogInfo))

k = requests.post(url="http://127.0.0.1:8000/blog", json = blogInfo)
print(k.json())
