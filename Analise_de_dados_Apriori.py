#!/usr/bin/env python
# coding: utf-8

# #PROJETO IEDAR_TCC#

# ##Importando bibliotecas##

# In[30]:


import pandas as pd
from mlxtend.frequent_patterns import apriori
from mlxtend.frequent_patterns import association_rules


# ##Importando a base de dados##

# In[31]:


df = pd.read_excel("compras.xltx")
df.head()


# ##Limpando a base de dados##

# In[32]:


df.info()


# In[33]:


df.isnull().sum()


# ###Tratando os dados da coluna 'Sexo'###

# In[34]:


df.loc[df['Sexo'].isnull()]


# In[35]:


df[['Sexo']].mode()


# In[36]:


pd.crosstab(df['Sexo'], df['CodCliente'], margins=True).head()


# In[37]:


(23350/25836)*100


# In[38]:


df['Sexo'].fillna('FEMININO', inplace=True)


# In[39]:


df.isnull().sum()


# ###Tratando os dados da coluna 'Idade'###

# In[40]:


df.loc[df['Idade'].isnull()]


# In[41]:


df['Idade'].median()


# In[42]:


df['Idade'].mode()


# In[43]:


df['Idade'].fillna(32, inplace=True)


# In[44]:


df.isnull().sum()


# ###Tratando outros dados###

# In[45]:


df.loc[df['VlrTotal'].isnull()]


# In[46]:


df.drop(21690, inplace=True)


# In[47]:


df.isnull().sum()


# #Aplicando o Apriori#

# In[48]:


df['Data'] = pd.to_datetime(df['Data'])


# In[49]:


basket = (df.groupby(['Data', 'Descricao Produto'])['VlrTotal'].sum().unstack().reset_index().fillna(0).set_index('Data'))
basket.head()


# In[50]:


#Cria uma matriz binária para os itens vendidos em cada data
def encoder (x):
  if x <= 0:
    return 0
  else:
    return 1

basket = basket.applymap(encoder)
basket.head()


# In[51]:


basket.shape


# In[52]:


items_together = apriori(basket, min_support=0.02, use_colnames=True)
items_together.sort_values(by=['support'], ascending=False)
items_together


# In[53]:


print(len(items_together))


# In[54]:


rules = association_rules(items_together, metric="confidence", min_threshold=0.04)


# In[55]:


rules.head()


# In[56]:


print(len(rules))


# In[57]:


rules

def test():
  print('Lourival')