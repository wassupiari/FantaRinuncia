const express = require('express')
const bcrypt = require("bcrypt");
const pool = require("../config/db.cjs")
const SECRET_ACCESS_TOKEN = require("../config/index.cjs")
const jwt = require('jsonwebtoken');

const router = express.Router()

const saltRounds = 10;
router.post('auth/register', async (req, res) => {
    const { username, password, nome, cognome } = req.body;
    try {
        const hashedPassword = await bcrypt.hash(password, saltRounds);
        await pool.query('INSERT INTO fantarinuncia.utente(username, password, nome, cognome) VALUES ($1, $2, $3, $4)', [username, hashedPassword , nome, cognome]);
        res.status(201).json({ message: 'Registrazione avvenuta con successo' });
    } catch (error) {
        console.error('Errore durante la registrazione:', error);
        res.status(500).json({ message: 'Errore durante la registrazione' });
    }
});

router.post('auth/login', async (req, res) => {
    const { username, password } = req.body;
    try {

        const result = await pool.query('SELECT password FROM fantarinuncia.utente WHERE username = $1', [username]);
        const hashedPassword = result.rows[0]?.password;


        if (!hashedPassword || !(await bcrypt.compare(password, hashedPassword))) {
            return res.status(401).json({ message: 'Credenziali non valide' });
        }


        const token = jwt.sign({ userId: hashedPassword.id }, SECRET_ACCESS_TOKEN);

        res.cookie('token', token, { httpOnly: true });

        res.status(200).json({ message: 'Login successful' });

    } catch (error) {
        console.error('Error during login:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

router.post('logout', (req, res) => {
    res.clearCookie('token');
    res.status(200).json({ message: 'Logout successful' });
});











module.exports =  router