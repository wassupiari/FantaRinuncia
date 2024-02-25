from flask import Flask, render_template, request, jsonify, session, redirect, url_for, send_from_directory, send_file
import os
import bcrypt
from logger import setup_logger
import git
import json
from datetime import datetime
from functools import wraps

version = '0.0.109'

# logging system
logger = setup_logger('app.log')

app = Flask(__name__, static_url_path='/static',static_folder='static')

app.secret_key = 'f8696db1c05e0ca25edc60029c0cdd99dc1b2b42f15aee2076e29fcf3fab36bf'


squadra_json_file = 'private/squadra.json'
utenti_json_file = 'private/utenti.json'
db_json_file = 'private/people.json'

def login_required(f):
    @wraps(f)
    def decorated_function(*args, **kwargs):
        if 'username' not in session:
            return redirect(url_for('login'))
        return f(*args, **kwargs)
    return decorated_function
@app.route('/favicon.ico')
def favicon():
    return send_from_directory(os.path.join(app.root_path,'static'),'favicon.ico')

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


# Nuova route per ottenere l'URL dell'immagine dell'utente
@app.route('/api/get_user_image')
def get_user_image():
    utenti = carica_utenti()
    username = session.get('username')
    if username in utenti:
        image_link = utenti[username].get('image_data', {}).get('image_link', '')
        return jsonify({'image_link': image_link})
    else:
        return jsonify({'image_link': ''})  # Restituisci un URL vuoto se l'utente non ha un'immagine



@app.route('/api/people', methods=['GET'])
def get_people():
    # Assicurati che l'utente sia autenticato per accedere all'API
    if 'username' in session:

        utenti = leggi_dati_da_file_json(utenti_json_file)


        if session['username'] in utenti:
            if 'ADMIN' in utenti[session['username']].get('badges', []):
                dati = leggi_dati_da_file_json(db_json_file)
                return jsonify(dati)

        return "Accesso non consentito: badge utente non autorizzato", 403
    else:
        return "Accesso non consentito: utente non autenticato", 401



def carica_utenti():
    if os.path.exists(utenti_json_file):
        with open(utenti_json_file, 'r') as file:
            return json.load(file)
    else:
        return 'il file utenti.json non esiste'

# Carica dati delle persone
with open(db_json_file, 'r') as file:
    people = json.load(file)


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
            return redirect(url_for('user', username=username))
        else:
            credentials_message = 'Credenziali non valide. Riprova.'
            return render_template('auth/login.html', credentials_message=credentials_message)
    # Se la richiesta non è di tipo POST, mostra la pagina di login
    return render_template('auth/login.html')


@app.route('/logout')
@login_required
def logout():
    session.pop('username', None)
    return redirect(url_for('index'))

@app.route('/')
def index():
    repo = git.Repo('/home/jarvis/FantaRinuncia/')
    commits = list(repo.iter_commits('main'))[:3]
    numero_squadre = conta_squadre(squadra_json_file)
    numero_utenti = conta_utenti(utenti_json_file)
    numero_persone = conta_persone(db_json_file)
    if 'username' in session:
        logout()
    else:
        return render_template('index.html', commits=commits,version=version,numero_squadre=numero_squadre,numero_utenti=numero_utenti,numero_persone=numero_persone)

    return render_template('index.html', commits=commits,version=version,numero_squadre=numero_squadre, numero_utenti=numero_utenti,numero_persone=numero_persone)

@app.route('/home')
@login_required
def user():
    return render_template('src/main.html', data=people)

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
            squadraEsinente_message = 'Hai già una squadra. Se vuoi cancellarla, vai alla pagina del tuo profilo.'
            return squadraEsinente_message

        # Aggiungi la nuova squadra per l'utente
        squadre[username] = selected_names

        # Salva tutte le squadre aggiornate sul file JSON
        with open(squadra_json_file, 'w') as file:
            json.dump(squadre, file)

        success_message = 'Squadra creata con successo!'
        return success_message
    return redirect(url_for('login'))

@app.route('/cancella-squadra', methods=['POST'])
def cancella_squadra():
    if 'username' in session:
        username = session['username']

        # Carica le squadre esistenti se il file esiste
        if os.path.exists(squadra_json_file):
            with open(squadra_json_file, 'r') as file:
                squadre = json.load(file)
        else:
            squadre = {}

        # Verifica se l'utente ha una squadra e cancellala se esiste
        if username in squadre:
            del squadre[username]

            # Salva le squadre aggiornate sul file JSON
            with open(squadra_json_file, 'w') as file:
                json.dump(squadre, file)

            delete_message = 'Squadra cancellata con successo.'

            return delete_message , True
        else:
            noSq_message = 'Non hai una squadra da cancellare.'
            return noSq_message , False
    else:
        return redirect(url_for('login'))



@app.route('/profile')
@login_required
def profile():
    if os.path.exists(utenti_json_file):
        with open(utenti_json_file, 'r') as file:
            squadre = leggi_dati_da_file_json(squadra_json_file)
            utenti = json.load(file)
            username = session['username']

            # Verifica se l'utente ha una squadra
            if username in squadre:
                total_points = sum(membro['points'] for membro in squadre[username])
            else:
                total_points = 0
                squadre = {}

            if username in utenti:
                bio = utenti[username]['bio']
                badges = utenti[username]['badges']
                data_creazione = utenti[username]['creation_date']
                data_creazione = datetime.strptime(data_creazione, '%Y-%m-%d')
                data_corrente = datetime.now()
                differenza = data_corrente - data_creazione
                return render_template('/src/profile.html', username=username, bio=bio, badges=badges,
                                       squadre=squadre, total_points=total_points,differenza=differenza.days)
            else:
                return 'Questo utente non esiste'
    else:
        return redirect(url_for('login'))

@app.route('/regolamento')
def regolamento():
    if 'username' in session:
        logged = True
    else:
        logged = False
    return render_template('/src/regolamento.html', logged=logged)


@app.route('/auth/register', methods=['GET', 'POST'])
def registrazione():
    if request.method == 'POST':
        username = request.form['username']
        password = request.form['password']
        bio = request.form['bio']
        image_link = request.form['image_link']

        # Carica gli utenti esistenti
        utenti = carica_utenti()

        # Controlla se l'username è già presente


        # Cripta la password prima di salvarla
        hashed_password = bcrypt.hashpw(password.encode('utf-8'), bcrypt.gensalt())

        creation_date = datetime.now().strftime('%Y-%m-%d')

        # Aggiunge il nuovo utente al dizionario con la password criptata e la data di creazione
        utenti[username] = {
            'password': hashed_password.decode('utf-8'),
            'bio': bio,
            'badges': [],
            'creation_date': creation_date
        }

        # Verifica se l'URL dell'immagine è fornito
        if image_link:
            utenti[username]['image_data'] = {
                'image_link': image_link
            }

        # Salva gli utenti aggiornati nel file JSON
        salva_utenti(utenti)

        alert_message = "Registrazione avvenuta con successo! Ora puoi effettuare il login."
        return render_template('auth/register.html', alert_message=alert_message)

    return render_template('auth/register.html')


@app.errorhandler(404)
def page_not_found(error):
    return render_template('404.html'), 404


def conta_squadre(file_json):
    try:
        with open(file_json, 'r') as file:
            data = json.load(file)
            numero_squadre = len(data)
            return numero_squadre
    except FileNotFoundError:
        return None
    except json.JSONDecodeError:
        return None

def conta_utenti(file_json):
    try:
        with open(file_json, 'r') as file:
            data = json.load(file)
            numero_utenti = len(data)
            return numero_utenti
    except FileNotFoundError:
        return None
    except json.JSONDecodeError:
        return None

def conta_persone(file_json):
    try:
        with open(file_json, 'r') as file:
            data = json.load(file)
            numero_persone = len(data)
            return numero_persone
    except FileNotFoundError:
        return None
    except json.JSONDecodeError:
        return None


@app.route('/sitemap.xml')
def render_xml():
    xml_file_path = 'templates/sitemap.xml'
    return send_file(xml_file_path, mimetype='text/xml')

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)



