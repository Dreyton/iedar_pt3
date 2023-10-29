from src.services.base import AuthenticationService
from src.services.base import EnsureAuthenticatedService
from fastapi import APIRouter, Depends, HTTPException, status
from typing import Annotated
from pydantic import BaseModel
from fastapi.security import OAuth2PasswordBearer

router = APIRouter()


class HttpRequest(BaseModel):
    email: str
    password: str


oauth2_scheme = OAuth2PasswordBearer(tokenUrl="token")

credentials_exception = HTTPException(
    status_code=status.HTTP_401_UNAUTHORIZED,
    detail="Could not validate credentials",
    headers={"WWW-Authenticate": "Bearer"},
)


@router.post("/login")
async def login(httpRequest: HttpRequest):
    try:
        service = AuthenticationService()
        response = service.execute(httpRequest.email, httpRequest.password)
        return response
    except Exception as e:
        return {"error": str(e)}


async def get_current_user(token: Annotated[str, Depends(oauth2_scheme)]):
    try:
        service = EnsureAuthenticatedService()
        response = service.execute(token)
        return response
    except Exception as e:
        return credentials_exception
