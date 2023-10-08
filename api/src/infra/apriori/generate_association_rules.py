import pandas as pd
from mlxtend.frequent_patterns import apriori
from mlxtend.frequent_patterns import association_rules
import json


class GenerateAssociationRules:
    @staticmethod
    def generate_association_rules(dataset, min_support=0.02, confiance=0.04):
        df = pd.read_excel(dataset)
        df.isnull().sum()
        df.loc[df['Sexo'].isnull()]
        df[['Sexo']].mode()
        df['Sexo'].fillna('FEMININO', inplace=True)
        df.isnull().sum()
        df.loc[df['Idade'].isnull()]
        df['Idade'].median()
        df['Idade'].mode()
        df['Idade'].fillna(32, inplace=True)
        df.isnull().sum()
        df.loc[df['VlrTotal'].isnull()]
        df.isnull().sum()
        df['Data'] = pd.to_datetime(df['Data'])
        basket = (df.groupby(['Data', 'Descricao Produto'])[
                  'VlrTotal'].sum().unstack().reset_index().fillna(0).set_index('Data'))
        basket.head()

        def encoder(x):
            if x <= 0:
                return 0
            else:
                return 1
        basket = basket.applymap(encoder)
        items_together = apriori(
            basket, min_support=min_support, use_colnames=True)
        items_together.sort_values(by=['support'], ascending=False)
        rules = association_rules(
            items_together, metric="confidence", min_threshold=confiance)
        return json.loads(rules.to_json(orient="records"))
