from src.infra.ormSqlAlchemy.repositories.user import UserRepository
from src.infra.cryptographic.generate_token import GenerateToken
from fastapi import HTTPException, status


credentials_exception = HTTPException(
    status_code=status.HTTP_401_UNAUTHORIZED,
    detail="Could not validate credentials",
    headers={"WWW-Authenticate": "Bearer"},
)


class AuthenticationError(Exception):
    pass


class EnsureAuthenticatedService:
    def __init__(self):
        self.generateToken = GenerateToken("secret")
        self.userRepository = UserRepository()

    def execute(self, token: str) -> dict:
        payload = self.generateToken.decode(token)
        if payload is None:
            raise credentials_exception

        user = self.userRepository.get_user_by_email(payload["email"])
        if user is None:
            raise credentials_exception
        return {
            "email": user.email,
            "permission": user.permission,
            "id": user.id
        }
