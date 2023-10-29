from sqlalchemy import Column
from sqlalchemy import Integer
from sqlalchemy import String
from sqlalchemy import Enum
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import relationship
from sqlalchemy.sql.schema import ForeignKey

Base = declarative_base()


class User(Base):
    __tablename__ = "users"
    id = Column(Integer, primary_key=True, index=True)
    email = Column(String, nullable=False, unique=True, index=True)
    password = Column(String, nullable=False)
    permission = Column(
        Enum("admin", "user", name="permission"), nullable=False)
    children = relationship("Associations", back_populates="user")


class Associations(Base):
    __tablename__ = "associations"
    id = Column(Integer, primary_key=True, index=True)
    rule_name = Column(String, nullable=False, index=True)
    antecedents = Column(String, nullable=False)
    consequents = Column(String, nullable=False)
    antecedent_support = Column(String, nullable=True)
    consequent_support = Column(String, nullable=True)
    support = Column(String, nullable=False)
    confidence = Column(String, nullable=False)
    lift = Column(String, nullable=False)
    leverage = Column(String, nullable=False)
    conviction = Column(String, nullable=False)
    zhangs_metric = Column(String, nullable=False)
    user_id = Column(Integer, ForeignKey("users.id"))
    user = relationship("User", back_populates="children")
