from src.infra.apriori.base import GenerateAssociationRules


class NotGenerateRulesException(Exception):
    def __init__(self, message):
        super().__init__(message)
        self.message = message


class GenerateAssociationRulesService:
    @staticmethod
    def execute(dataset, min_support, confiance):
        associations = GenerateAssociationRules.generate_association_rules(
            dataset, min_support, confiance)
        if len(associations) == 0:
            raise NotGenerateRulesException(
                "Não foi possível gerar regras de associação")
        return associations
