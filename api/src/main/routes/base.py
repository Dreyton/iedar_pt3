from src.main.routes import route_rule
from src.main.routes import route_file
from src.main.routes import route_login
from src.main.routes import route_associations
from fastapi import APIRouter


api_router = APIRouter()
api_router.include_router(route_rule.router, prefix="", tags=["rules"])
api_router.include_router(route_file.router, prefix="", tags=["files"])
api_router.include_router(route_login.router, prefix="", tags=["login"])
api_router.include_router(route_associations.router,
                          prefix="", tags=["associations"])
