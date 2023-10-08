from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from sqlalchemy.ext.declarative import declarative_base
from src.main.config.env import env


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
        engine = create_engine(env.DATABASE_URL)
        return engine

    def create_session(self):
        Session = sessionmaker(bind=self.engine)
        session = Session()
        return session

    @staticmethod
    def get_base():
        Base = declarative_base()
        return Base
