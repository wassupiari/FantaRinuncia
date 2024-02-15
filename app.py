from flask import Flask, render_template, request, jsonify, session, redirect, url_for
import json
import os
import bcrypt
import base64
import requests


app = Flask(__name__, static_url_path='/static')

app.secret_key = '8a6sd-a9s66d8as86d-9asd'


squadra_json_file = 'private/squadra.json'
utenti_json_file = 'private/utenti.json'
db_json_file = 'private/people.json'

# Funzione per leggere i dati dal file JSON
def leggi_dati_da_file_json(nome_file):
    with open(nome_file, 'r') as file:
        dati = json.load(file)
    return dati

# Middleware per nascondere la richiesta GET /people
@app.before_request
def nascondi_get_people():
    if request.path == '/people' and 'username' not in session:
        return "Accesso non consentito", 403

def get_base64_from_image_url(image_url):
    response = requests.get(image_url)
    if response.status_code == 200:
        image_data = response.content
        base64_encoded_image = base64.b64encode(image_data).decode('utf-8')
        return base64_encoded_image
    else:
        return None
@app.route('/api/get_image')
def get_image_base64():
    utenti = leggi_dati_da_file_json(utenti_json_file)

    # Dizionario per contenere i dati dell'immagine di ogni utente
    immagini_utenti = {}

    # Ciclo attraverso ogni utente nel file JSON
    for username, user_data in utenti.items():
        # Recupera i dati dell'immagine per l'utente corrente
        image_data = user_data.get("image_data", {'base64_encoded_image'})
        image_link = image_data.get("image_link", "")

        # Se l'URL dell'immagine è vuoto, passa al prossimo utente
        if not image_link:
            continue

        # Ottieni l'encoding Base64 dell'immagine
        base64_encoded_image = get_base64_from_image_url(image_link)

        # Aggiorna l'oggetto JSON con l'encoding Base64 dell'immagine
        image_data["base64_encoded_image"] = base64_encoded_image

        # Aggiungi i dati dell'immagine dell'utente al dizionario
        immagini_utenti[username] = image_data

        # Restituisci i dati dell'immagine con l'encoding Base64 per tutti gli utenti
    return jsonify(immagini_utenti)

@app.route('/api/people', methods=['GET'])
def get_people():
    # Assicurati che l'utente sia autenticato per accedere all'API
    if 'username' in session:
        # Leggi i dati dal file JSON
        dati = leggi_dati_da_file_json(db_json_file)
        return jsonify(dati)
    else:
        return "Accesso non consentito", 403


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
    if 'username' in session:
        # Se l'utente è già loggato, reindirizzalo alla pagina principale
        return redirect(url_for('index'))

    if request.method == 'POST':
        username = request.form['username']
        password = request.form['password']

        # Carica gli utenti esistenti
        utenti = carica_utenti()

        # Verifica se l'utente esiste e le credenziali sono corrette
        if username in utenti and bcrypt.checkpw(password.encode('utf-8'), utenti[username]['password'].encode('utf-8')):
            session['username'] = username
            return redirect(url_for('index'))
        else:
            return 'Credenziali non valide. <a href="/auth/login">Riprova</a>'

    # Se la richiesta non è di tipo POST, mostra la pagina di login
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
            return {}

        # Aggiungi la nuova squadra per l'utente
        squadre[username] = selected_names

        # Salva tutte le squadre aggiornate sul file JSON
        with open(squadra_json_file, 'w') as file:
            json.dump(squadre, file)

        return 'Squadra creata e salvata.'
    return 'Non sei loggato <a href="/auth/login">Login</a>'


@app.route('/profile')
def profile():
    if 'username' in session:
        # Verifica se il file utenti_json_file esiste
        if os.path.exists(utenti_json_file):
            with open(utenti_json_file, 'r') as file:
                squadre = leggi_dati_da_file_json(squadra_json_file)
                utenti = json.load(file)
                username = session['username']
                # Verifica se l'utente corrente esiste nel file utenti_json_file
                if username in utenti:
                    bio = utenti[username]['bio']
                    badges = utenti[username]['badges']
                    return render_template('/src/profile.html', username=username, bio=bio, badges=badges,squadre=squadre)
                else:
                    return 'Questo utente non esiste'
        else:
            return 'Il file utenti.json non esiste'
    else:
        # Se l'utente non è autenticato, reindirizzalo alla pagina di login
        return redirect(url_for('login'))


if os.path.exists(squadra_json_file):
    with open(squadra_json_file, 'r') as file:
        squadre = json.load(file)


@app.route('/auth/register', methods=['GET', 'POST'])
def registrazione():
    if request.method == 'POST':
        username = request.form['username']
        password = request.form['password']
        image_link = request.form['image_link']

        # Carica gli utenti esistenti
        utenti = carica_utenti()

        # Controlla se l'username è già presente
        if username in utenti:
            return 'Username già esistente. <a href="/auth/register">Riprova</a>'

        # Cripta la password prima di salvarla
        hashed_password = bcrypt.hashpw(password.encode('utf-8'), bcrypt.gensalt())

        # Aggiunge il nuovo utente al dizionario con la password criptata
        utenti[username] = {'password': hashed_password.decode('utf-8'), 'bio': '', 'badges': []}

        # Verifica se l'URL dell'immagine è fornito
        if image_link:
            # Ottiene l'immagine da un URL e ne codifica l'encoding Base64
            base64_encoded_image = get_base64_from_image_url(image_link)

            if base64_encoded_image:
                utenti[username]['image_data'] = {
                    'image_link': image_link,
                    'base64_encoded_image': base64_encoded_image
                }
            else:
                return 'Errore durante il caricamento dell\'immagine. <a href="/auth/register">Riprova</a>'

        # Salva gli utenti aggiornati nel file JSON
        salva_utenti(utenti)

        return 'Registrazione completata. <a href="/auth/login">Effettua il login</a>'

    return render_template('auth/register.html')
@app.errorhandler(404)
def page_not_found(error):
    return render_template('404.html'), 404

if __name__ == '__main__':
    app.run(debug=True)
