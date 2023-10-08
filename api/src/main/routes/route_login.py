from fastapi import APIRouter
from src.infra.ormSqlAlchemy.repositories.user import get_user_by_email
from src.infra.cryptographic.hasher import Hasher
from src.infra.cryptographic.generate_token import GenerateToken
from pydantic import BaseModel

router = APIRouter()


class HttpRequest(BaseModel):
    email: str
    password: str


@router.post("/login")
async def login(httpRequest: HttpRequest):
    user = await get_user_by_email(httpRequest.email)
    if user is None:
        return {
            "error": "Credenciais inválidas"
        }
    hasher = Hasher()
    isValid = hasher.verify(httpRequest.password, user.password)
    if not isValid:
        return {
            "error": "Credenciais inválidas"
        }
    generate_token = GenerateToken("secret")
    access_token = generate_token.generate(
        {"email": user.email, "permission": user.permission})
    return {
        "data": access_token
    }
