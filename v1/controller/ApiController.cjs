const bcrypt = require('bcrypt');
const pool = require("../config/db.cjs");
const generateJWTToken = require('../config/generateJWTToken.cjs');
const jwt = require("jsonwebtoken");
const {SECRET_ACCESS_TOKEN} = require("../config/index.cjs");
const saltRounds = 10;

exports.login = async (req, res) => {
    try {
        const { username, password } = req.body;
        const result = await pool.query('SELECT * FROM fantarinuncia.utente WHERE username = $1', [username]);
        const user = result.rows[0];

        if (!user || !(await bcrypt.compare(password, user.password))) {
            return res.status(401).json({ message: 'Credenziali non valide' });
        }

        // Genera il token JWT utilizzando l'ID dell'utente
        const token = generateJWTToken(user.id);

        // Restituisci il token JWT e l'username come parte della risposta
        res.json({ token, username: user.username });
        console.log("Utente autenticato:", user.username);
        console.log('Risultato della query:', result.rows);
    } catch (err) {
        console.log(err);
        res.status(500).send('Internal Server Error');
    }
};

exports.logout = (req, res) => {
    const bearerHeader = req.headers['authorization']
    if (typeof bearerHeader !== 'undefined') {
        const bearerToken = bearerHeader.split(' ')[1]
        // Aggiungi bearerToken alla blacklist
    }
    return res.sendStatus(200)
};

exports.register = async (req, res) => {
    const { username, password, nome, cognome } = req.body;
    try {
        if (!username || !password || !nome || !cognome) {
            return res.status(400).json({ message: 'Tutti i campi sono obbligatori' });
        }

        const hashedPassword = await bcrypt.hash(password, saltRounds);
        await pool.query('INSERT INTO fantarinuncia.utente(username, password, nome, cognome) VALUES ($1, $2, $3, $4)', [username, hashedPassword, nome, cognome]);
        res.status(201).json({ message: 'Registrazione avvenuta con successo' });

    } catch (error) {
        console.error('Errore durante la registrazione:', error);
        res.status(500).json({ message: 'Errore durante la registrazione' });
    }
};



exports.getUser = async (req, res) => {
    try {
        // Esegui la query per ottenere i dati dell'utente dal database
        const query = 'SELECT * FROM fantarinuncia.utente WHERE id = $1';
        const result = await pool.query(query, [req.userId]);
        const userData = result.rows[0];

        // Se l'utente non viene trovato, restituisci un errore 404
        if (!userData) {
            return res.status(404).json({ message: 'Utente non trovato' });
        }
        console.log('Risultato della query:', result.rows);

        // Se l'utente viene trovato, restituisci i dati dell'utente
        res.json(userData);
    } catch (error) {
        console.error('Errore durante il recupero dei dati dell\'utente:', error);
        res.status(500).json({ message: 'Errore durante il recupero dei dati dell\'utente' });
    }
}

exports.updateUser = async (req, res) => {
    try {
        const userId = req.userId;
        const { nome, cognome, bio } = req.body;

        console.log('Dati ricevuti dalla richiesta:', { userId, nome, cognome, bio });

        const query = 'UPDATE fantarinuncia.utente SET nome = $1, cognome = $2, bio = $3 WHERE id = $4 RETURNING *';
        console.log('Query SQL:', query);

        const result = await pool.query(query, [nome, cognome, bio, userId]);

        console.log('Risultato della query:', result.rows);

        if (result.rows.length === 0) {
            return res.status(404).json({ message: 'Utente non trovato' });
        }

        res.json(result.rows[0]);
    } catch (error) {
        console.error('Errore durante l\'aggiornamento del profilo:', error);
        res.status(500).json({ message: 'Errore durante l\'aggiornamento del profilo' });
    }
};






