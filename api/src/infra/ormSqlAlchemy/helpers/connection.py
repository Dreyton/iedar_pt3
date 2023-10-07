from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from sqlalchemy.ext.declarative import declarative_base


class PgConnection:
    _instance = None
    engine = None

    def __new__(cls):
        if cls._instance is None:
            cls._instance = super().__new__(cls)
            cls.engine = cls.connection()
        return cls._instance

    @staticmethod
    def connection():
        connection_url = "postgresql://postgres:postgres@172.31.0.2:5432/tcc"
        engine = create_engine(connection_url)
        return engine

    def create_session(self):
        Session = sessionmaker(bind=self.engine)
        session = Session()
        return session

    @staticmethod
    def get_base():
        Base = declarative_base()
        return Base
