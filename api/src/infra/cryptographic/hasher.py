from passlib.context import CryptContext


class Hasher:
    def __init__(self):
        self._crypt_context = CryptContext(
            schemes=["bcrypt"], deprecated="auto")

    def hash(self, password: str) -> str:
        return self._crypt_context.hash(password)

    def verify(self, password: str, hashed_password: str) -> bool:
        return self._crypt_context.verify(password, hashed_password)
