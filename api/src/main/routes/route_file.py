import pickle
from typing import Annotated
from fastapi.responses import FileResponse
from fastapi import APIRouter
from fastapi import File
from package.Analise_de_dados_Apriori import generate_association_rules
from package.create_database import create_rule

router = APIRouter()


class NotGenerateRulesException(Exception):
    def __init__(self, message):
        super().__init__(message)
        self.message = message


@router.post("/uploads")
def uploadFile(dataset: Annotated[bytes, File()], rule_name: str, min_support: float = 0.02, confiance: float = 0.04):
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


@router.get("/uploads")
def listUploadsFile(rule_name: str = None):
    path_file = f"{rule_name}.pkl"
    with open(path_file, 'rb') as file:
        result = pickle.load(file)
    return {
        "data": result
    }


@router.get("/download")
def downloadFile():
    some_file_path = "/files/template.xlsx"
    return FileResponse(some_file_path)
