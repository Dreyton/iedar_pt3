from pydantic import BaseModel
from src.infra.ormSqlAlchemy.repositories.user import UserRepository


class Model(BaseModel):
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


class NotCrateAssociationsException(Exception):
    pass


class CreateAssociationRulesService:
    def __init__(self):
        self.userRepository = UserRepository()

    def execute(self, model: Model):
        self.userRepository.create_association(model)
