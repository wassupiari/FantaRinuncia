const { POSTGRES_URL, POSTGRES_DB, POSTGRES_USER, POSTGRES_PASSWORD } = require("../config/index.cjs");
const { Pool } = require('pg');

const pool = new Pool({
    user: POSTGRES_USER,
    host: POSTGRES_URL,
    database: POSTGRES_DB,
    password: POSTGRES_PASSWORD,
    port: 5432,
});

// Connessione al database e verifica del successo
pool.connect((err, client, release) => {
    if (err) {
        console.error('Errore durante la connessione al database:', err);
    } else {
        console.log('Connessione al database avvenuta con successo!');
        release(); // Rilascia il cliente
    }
});

module.exports = pool;
