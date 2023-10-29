from src.infra.ormSqlAlchemy.repositories.user import UserRepository
from src.infra.cryptographic.hasher import Hasher
from src.infra.cryptographic.generate_token import GenerateToken


class AuthenticationError(Exception):
    pass


class AuthenticationService:
    def __init__(self):
        self.hasher = Hasher()
        self.generateToken = GenerateToken("secret")
        self.userRepository = UserRepository()

    def execute(self, email: str, password: str) -> dict:
        user = self.userRepository.get_user_by_email(email)
        if user is None:
            raise AuthenticationError("Credencias inválidas")
        isValid = self.hasher.verify(password, user.password)
        if not isValid:
            raise AuthenticationError("Credencias inválidas")
        last_association = self.userRepository.get_last_association(user.id)
        access_token = self.generateToken.generate(
            {
                "email": user.email,
                "permission": user.permission,
                "rule_name": last_association.rule_name,
            })
        return {
            "data": {
                "access_token": access_token,
                "rule_name": last_association.rule_name,
            }
        }
