from fastapi import FastAPI,Request,Response
import json
from fastapi.middleware.cors import CORSMiddleware
import time
from blog_generator import blog_data_gen

app = FastAPI()
counter = 0
origins = ["*"]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)



@app.get("/") #Returns the status of the server
async def root():
    return {"message": "server active"}

@app.post("/blog")
async def blog_gen1(title: Request): 
    global counter
    var1 = await title.json()
    counter = counter +1
    ret=blog_data_gen(var1['title'])
    print(counter)
    return {"response":ret}
