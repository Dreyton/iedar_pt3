from src.infra.apriori.base import GenerateAssociationRules
import pickle


class NotGenerateRulesException(Exception):
    def __init__(self, message):
        super().__init__(message)
        self.message = message


def create_rule(rule_name, data):
    file_path = f"{rule_name}.pkl"
    with open(file_path, 'wb') as file:
        pickle.dump(data, file)


class GenerateAssociationRulesService:
    @staticmethod
    def execute(dataset, rule_name, min_support, confiance):
        associations = GenerateAssociationRules.generate_association_rules(
            dataset, min_support, confiance)
        create_rule(rule_name, associations)
        if len(associations) == 0:
            raise NotGenerateRulesException(
                "Não foi possível gerar regras de associação")
        return {"data": associations}
