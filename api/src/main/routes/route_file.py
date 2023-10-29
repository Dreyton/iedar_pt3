import pickle
from typing import Annotated
from fastapi.responses import FileResponse
from fastapi import APIRouter
from fastapi import File
from src.services.generate_association_rules import GenerateAssociationRulesService

router = APIRouter()


@router.post("/uploads")
def uploadFile(dataset: Annotated[bytes, File()], rule_name: str, min_support: float = 0.02, confiance: float = 0.04):
    try:
        result = GenerateAssociationRulesService.execute(
            dataset, rule_name, min_support, confiance)
        httpResponse: list = []
        for item in result:
            httpResponse.append({
                "rule_name": rule_name,
                "antecedents": item['antecedents'][0],
                "consequents": item['consequents'][0],
                "antecedent_support": item['antecedent support'],
                "consequent_support": item['consequent support'],
                "support": item['support'],
                "confidence": item['confidence'],
                "lift": item['lift'],
                "leverage": item['leverage'],
                "conviction": item['conviction'],
                "zhangs_metric": item['zhangs_metric'],
            })

        return {"data": httpResponse}
    except Exception as e:
        return {"error": e.message}


@router.get("/uploads")
def listUploadsFile(rule_name: str = None):
    path_file = f"{rule_name}.pkl"
    with open(path_file, 'rb') as file:
        result = pickle.load(file)
    return {"data": result}


@router.get("/download")
def downloadFile():
    some_file_path = "/files/template.xlsx"
    return FileResponse(some_file_path)
