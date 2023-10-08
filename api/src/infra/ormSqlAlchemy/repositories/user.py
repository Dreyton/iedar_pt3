from src.infra.ormSqlAlchemy.entities.user import User
from src.infra.ormSqlAlchemy.helpers.connection import PgConnection
from src.infra.cryptographic.hasher import Hasher


class UserRepository:
    def __init__(self):
        self.session = PgConnection().create_session()

    def get_user_by_email(self, email: str):
        user = self.session.query(User).filter(User.email == email).first()
        return user

    def create_user(self):
        hasher = Hasher()
        user = User(email="lourivalformal@gmail.com",
                    password=hasher.hash("123456"), permission="admin")
        self.session.add(user)
        self.session.commit()
        self.session.close()
