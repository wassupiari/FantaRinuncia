const express = require('express')
const bcrypt = require("bcrypt");
const {pool} = require("../src/service/pool.cjs");
const path = require("path");
const router = express.Router()

const saltRounds = 10;
router.post('/register', async (req, res) => {
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

router.post('/login', async (req, res) => {
    const { username, password } = req.body;
    try {

        const result = await pool.query('SELECT password FROM fantarinuncia.utente WHERE username = $1', [username]);
        const hashedPassword = result.rows[0]?.password;


        if (!hashedPassword || !(await bcrypt.compare(password, hashedPassword))) {
            return res.status(401).json({ message: 'Credenziali non valide' });
        }

        res.status(200).json({ redirectUrl: `/dashboard/${username}` });

    } catch (error) {
        console.error('Errore durante il login:', error);
        return res.status(500).json({ message: 'Errore durante il login' });
    }
});

router.get('/dashboard/:username' ,(req, res) =>{
    res.sendFile(path.join(__dirname, "pages", "DashboardPage.jsx"));
})





module.exports =  router