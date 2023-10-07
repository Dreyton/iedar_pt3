from jose import jwt


class GenerateToken:
    def __init__(self, secret: str) -> None:
        self.secret = secret

    def generate(self, payload: dict) -> str:
        token = jwt.encode(payload, self.secret)
        return token
