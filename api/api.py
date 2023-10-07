from typing import Annotated
import glob
from fastapi import FastAPI, File
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import FileResponse
from package.Analise_de_dados_Apriori import generate_association_rules
from package.create_database import create_rule
import pickle

app = FastAPI()
origins = [
    "http://localhost:3000",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


class NotGenerateRulesException(Exception):
    def __init__(self, message):
        super().__init__(message)
        self.message = message


@app.post("/uploads")
def read_root(dataset: Annotated[bytes, File()], rule_name: str, min_support: float = 0.02, confiance: float = 0.04, ):
    try:
        data = generate_association_rules(dataset, min_support, confiance)
        create_rule(rule_name, data)
        if len(data) == 0:
            raise NotGenerateRulesException(
                "Não foi possível gerar regras de associação")
        return {
            "data": data
        }
    except NotGenerateRulesException as e:
        return {
            "error": e.message
        }


@app.get("/uploads")
def read_root(rule_name: str = None):
    path_file = f"{rule_name}.pkl"
    with open(path_file, 'rb') as file:
        result = pickle.load(file)
    return {
        "data": result
    }


@app.get("/rules")
def read_root():
    default = "*.pkl"
    path_file = glob.glob(default)
    filenames = [file.split(".pkl")[0] for file in path_file]
    return {
        "data": filenames
    }


@app.get("/files/download")
def rea_root():
    some_file_path = "/files/template.xlsx"
    return FileResponse(some_file_path)
