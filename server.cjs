const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const PORT = process.env.PORT || 3000;
const { pool } = require('./src/service/pool.cjs');
const bcrypt = require('bcrypt');
const path = require('path');
const cors = require('cors');
const saltRounds = 10;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Middleware per consentire le richieste CORS da tutti gli origini
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
});
app.use(cors());


app.post('/register', async (req, res) => {
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

app.post('/login', async (req, res) => {
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

app.get('/dashboard/:username' ,(req, res) =>{
    res.sendFile(path.join(__dirname, "pages", "DashboardPage.jsx"));
})




// Avvio del server
app.listen(PORT, () => console.log(`Server in esecuzione sulla porta ${PORT}`));
