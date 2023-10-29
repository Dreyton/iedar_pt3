from fastapi import APIRouter, Depends
from src.services.create_association_rules import CreateAssociationRulesService
from typing import Annotated
from src.infra.ormSqlAlchemy.entities.user import User
from pydantic import BaseModel
from src.main.routes.route_login import get_current_user

router = APIRouter()


class HttpRequest(BaseModel):
    rule_name: str
    antecedents: str
    consequents: str
    antecedent_support: str
    consequent_support: str
    support: str
    confidence: str
    lift: str
    leverage: str
    conviction: str
    zhangs_metric: str
    user_id: int = None


@router.post("/associations")
def create(httpRequest: HttpRequest, current_user: Annotated[User, Depends(get_current_user)]):
    try:
        httpRequest.user_id = current_user["id"]
        service = CreateAssociationRulesService()
        response = service.execute(httpRequest)
        return response
    except Exception as e:
        return {"error": str(e)}
