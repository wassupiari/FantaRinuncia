import json
import random

def aggiungi_punti(json_file, nuovo_json_file):
    with open(json_file, 'r') as file:
        data = json.load(file)

    for entry in data:
        entry["points"] = random.randint(5, 20)

    with open(nuovo_json_file, 'w') as file:
        json.dump(data, file, indent=4)

# Utilizzo dello script
json_file = "private/people.json"  # Imposta il percorso del file JSON da leggere
nuovo_json_file = "private/people.json"  # Imposta il percorso del nuovo file JSON
aggiungi_punti(json_file, nuovo_json_file)
