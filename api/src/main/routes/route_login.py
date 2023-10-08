from src.services.base import AuthenticationService
from fastapi import APIRouter
from pydantic import BaseModel

router = APIRouter()


class HttpRequest(BaseModel):
    email: str
    password: str


@router.post("/login")
async def login(httpRequest: HttpRequest):
    try:
        service = AuthenticationService()
        response = service.execute(httpRequest.email, httpRequest.password)
        return response
    except Exception as e:
        return {"error": str(e)}
