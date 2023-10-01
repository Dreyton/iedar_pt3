import pickle

def create_rule(rule_name, data):
  file_path = f"{rule_name}.pkl"
  with open(file_path, 'wb') as file:
      pickle.dump(data, file)
