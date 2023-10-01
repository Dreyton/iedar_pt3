from fastapi import FastAPI
from Analise_de_dados_Apriori.test import test

app = FastAPI()

@app.get("/")
def read_root():
    print(test())
    return {"Hello": "World"}
