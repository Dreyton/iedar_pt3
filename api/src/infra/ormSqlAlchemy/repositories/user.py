from src.infra.ormSqlAlchemy.entities.user import User
from src.infra.ormSqlAlchemy.entities.user import Associations
from src.infra.ormSqlAlchemy.helpers.connection import PgConnection
from src.infra.cryptographic.hasher import Hasher
from pydantic import BaseModel


class AssociationModel(BaseModel):
    rule_name: str
    antecedents: str
    consequents: str
    antecedent_support: str
    consequent_support: str
    support: str
    confidence: str
    lift: str
    leverage: str
    conviction: str
    zhangs_metric: str
    user_id: int = None


class UserRepository:
    def __init__(self):
        self.session = PgConnection().create_session()

    def get_user_by_email(self, email: str):
        user = self.session.query(User).filter(User.email == email).first()
        return user

    def create_user(self):
        hasher = Hasher()
        user = User(email="tarcio@mail.com",
                    password=hasher.hash("123456"), permission="admin")
        self.session.add(user)
        self.session.commit()
        self.session.close()

    def create_association(self, associationModel: AssociationModel):
        user = self.session.query(User).filter(
            User.id == associationModel.user_id).first()
        association = Associations(
            rule_name=associationModel.rule_name,
            antecedents=associationModel.antecedents,
            consequents=associationModel.consequents,
            antecedent_support=associationModel.antecedent_support,
            consequent_support=associationModel.consequent_support,
            support=associationModel.support,
            confidence=associationModel.confidence,
            lift=associationModel.lift,
            leverage=associationModel.leverage,
            conviction=associationModel.conviction,
            zhangs_metric=associationModel.zhangs_metric,
            user=user
        )
        self.session.add(association)
        self.session.commit()
        self.session.close()

    def load_all_associations(self, user_id: int, rule_name: str = None):
        query = self.session.query(Associations).filter(
            Associations.user_id == user_id)
        if rule_name is not None:
            query = query.filter(Associations.rule_name == rule_name)
        associations = query.all()
        return associations
