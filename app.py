from flask import Flask, render_template, request, jsonify, session, redirect, url_for
import json
import os

app = Flask(__name__)
app.secret_key = 'il_tuo_segreto'

# Percorso del file JSON per le squadre
squadra_json_file = 'squadra.json'
utenti_json_file = 'utenti.json'
db_json_file = 'people.json'

# Funzione per leggere i dati dal file JSON
def leggi_dati_da_file_json(nome_file):
    with open(nome_file, 'r') as file:
        dati = json.load(file)
    return dati

# Middleware per nascondere la richiesta GET /people
@app.before_request
def nascondi_get_people():
    if request.path == '/people':
        return "Accesso non consentito", 403


# Percorso per ottenere i dati senza mostrare i parametri GET
@app.route('/api/people', methods=['GET'])
def get_people():
    # Leggi i dati dal file JSON
    dati = leggi_dati_da_file_json(db_json_file)
    return jsonify(dati)

# Funzione per caricare gli utenti dal file JSON
def carica_utenti():
    if os.path.exists(utenti_json_file):
        with open(utenti_json_file, 'r') as file:
            return json.load(file)
    else:
        return {}

# Funzione per salvare gli utenti nel file JSON
def salva_utenti(utenti):
    with open(utenti_json_file, 'w') as file:
        json.dump(utenti, file)

@app.route('/auth/login', methods=['GET', 'POST'])
def login():
    if request.method == 'POST':
        username = request.form['username']
        password = request.form['password']

        # Carica gli utenti esistenti
        utenti = carica_utenti()

        # Verifica se l'utente esiste e le credenziali sono corrette
        if username in utenti and utenti[username] == password:
            session['username'] = username
            return redirect(url_for('index'))
        else:
            return 'Credenziali non valide. <a href="/auth/login">Riprova</a>'
    return render_template('auth/login.html')

@app.route('/logout')
def logout():
    session.pop('username', None)
    return redirect(url_for('login'))

# Carica dati delle persone
with open(db_json_file, 'r') as file:
    people = json.load(file)

@app.route('/')
def index():
    if 'username' in session:
        return render_template('index.html', data=people)
    return 'Non sei loggato <a href="/auth/login">Login</a>'

@app.route('/crea-squadra', methods=['POST'])
def crea_squadra():
    if 'username' in session:
        username = session['username']
        data = request.json
        selected_names = data.get('squadra', [])

        # Carica squadre esistenti se il file esiste, altrimenti inizializza un nuovo dizionario vuoto
        if os.path.exists(squadra_json_file):
            try:
                with open(squadra_json_file, 'r') as file:
                    squadre = json.load(file)
            except json.decoder.JSONDecodeError:
                squadre = {}
        else:
            squadre = {}

        # Verifica se l'utente ha già una squadra e restituisci un messaggio di errore se è così
        if username in squadre:
            return 'Hai già creato una squadra. Per creare una nuova squadra, cancella prima quella esistente.'

        # Aggiungi la nuova squadra per l'utente
        squadre[username] = selected_names

        # Salva tutte le squadre aggiornate sul file JSON
        with open(squadra_json_file, 'w') as file:
            json.dump(squadre, file)

        return 'Squadra creata e salvata.'
    return 'Non sei loggato <a href="/auth/login">Login</a>'

@app.route('/visualizza-squadre')
def visualizza_squadre():
    if 'username' in session:
        if os.path.exists(squadra_json_file):
            with open(squadra_json_file, 'r') as file:
                squadre = json.load(file)
                username = session['username']
                return render_template('/src/views.html', squadre=squadre, username=username)
        else:
            return 'Nessuna squadra trovata'
    return 'Non sei loggato <a href="/auth/login">Login</a>'

@app.route('/auth/register', methods=['GET', 'POST'])
def registrazione():
    if request.method == 'POST':
        username = request.form['username']
        password = request.form['password']

        # Carica gli utenti esistenti
        utenti = carica_utenti()

        # Controlla se l'username è già presente
        if username in utenti:
            return 'Username già esistente. <a href="/auth/register">Riprova</a>'
        else:
            # Aggiunge il nuovo utente al dizionario
            utenti[username] = password
            # Salva il dizionario aggiornato nel file JSON
            salva_utenti(utenti)
            return 'Registrazione completata. <a href="/auth/login">Effettua il login</a>'
    return render_template('auth/register.html')

if __name__ == '__main__':
    app.run(debug=True)
