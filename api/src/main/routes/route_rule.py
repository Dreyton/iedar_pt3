from fastapi import APIRouter, Depends
from typing import Annotated
from src.infra.ormSqlAlchemy.entities.user import User
from src.main.routes.route_login import get_current_user
from src.services.load_all_associations_rules import LoadAllAssociationsRulesService

router = APIRouter()


@router.get("/associations")
def listAll(current_user: Annotated[User, Depends(get_current_user)], rule_name: str = None):
    try:
        service = LoadAllAssociationsRulesService()
        response = service.execute(current_user["id"], rule_name)
        return response
    except Exception as e:
        return {"error": str(e)}
