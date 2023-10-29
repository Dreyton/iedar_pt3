from fastapi import APIRouter, Depends
from src.services.create_association_rules import CreateAssociationRulesService
from typing import Annotated, List
from src.infra.ormSqlAlchemy.entities.user import User
from pydantic import BaseModel
from src.main.routes.route_login import get_current_user

router = APIRouter()


class HttpRequest(BaseModel):
    rule_name: str
    antecedents: str
    consequents: str
    antecedent_support: float = None
    consequent_support: float = None
    support: float
    confidence: float
    lift: float
    leverage: float
    conviction: float
    zhangs_metric: float
    user_id: int = None


@router.post("/associations")
def create(httpRequest: List[HttpRequest], current_user: Annotated[User, Depends(get_current_user)]):
    try:
        service = CreateAssociationRulesService()
        for request in httpRequest:
            request.user_id = current_user["id"]
            request.antecedent_support = str(request.antecedent_support)
            request.consequent_support = str(request.consequent_support)
            request.support = str(request.support)
            request.confidence = str(request.confidence)
            request.lift = str(request.lift)
            request.leverage = str(request.leverage)
            request.conviction = str(request.conviction)
            request.zhangs_metric = str(request.zhangs_metric)
            service.execute(request)
        return {"success": True}
    except Exception as e:
        return {"error": str(e)}
