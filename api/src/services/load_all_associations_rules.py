from pydantic import BaseModel
from src.infra.ormSqlAlchemy.repositories.user import UserRepository


class NotCrateAssociationsException(Exception):
    pass


class LoadAllAssociationsRulesService:
    def __init__(self):
        self.userRepository = UserRepository()

    def execute(self, user_id: int, rule_name: str = None):
        associations = self.userRepository.load_all_associations(
            user_id, rule_name)
        return associations
