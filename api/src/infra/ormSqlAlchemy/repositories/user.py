from src.infra.ormSqlAlchemy.entities.user import User
from src.infra.ormSqlAlchemy.helpers.connection import PgConnection
from src.infra.cryptographic.hasher import Hasher


async def get_user_by_email(email: str):
    connection = PgConnection()
    session = connection.create_session()
    user = session.query(User).filter(User.email == email).first()
    return user


async def create_user():
    hasher = Hasher()
    connection = PgConnection()
    session = connection.create_session()
    user = User(email="tarcio@mail.com",
                password=hasher.hash("123456"), permission="admin")
    session.add(user)
    session.commit()
    session.close()
