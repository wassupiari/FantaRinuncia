const jwt = require('jsonwebtoken');
const { SECRET_ACCESS_TOKEN } = require('../config/index.cjs');

// Funzione per generare un token JWT
function generateJWTToken(userId) {
    // Crea il payload del token con l'ID dell'utente
    const payload = { userId };

    // Genera il token JWT con il payload e la chiave segreta
    const token = jwt.sign(payload, SECRET_ACCESS_TOKEN, { expiresIn: '1h' }); // Imposta la scadenza del token a 1 ora

    return token;
}

module.exports = generateJWTToken;
