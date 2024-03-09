const jwt = require('jsonwebtoken');
const { SECRET_ACCESS_TOKEN } = require('../../config/index.cjs');

// Middleware per verificare il token JWT
const verifyToken = (req, res, next) => {
    // Ottieni il token dall'header Authorization
    const token = req.headers.authorization?.split(' ')[1];

    // Se il token non è presente, restituisci un errore 401
    if (!token) {
        return res.status(401).json({ message: 'Token JWT mancante' });
    }

    try {
        // Verifica il token JWT
        const decodedToken = jwt.verify(token, SECRET_ACCESS_TOKEN);
        req.userId = decodedToken.userId;
        next(); // Passa al middleware successivo se il token è valido
    } catch (error) {
        console.error('Errore durante la verifica del token JWT:', error);
        return res.status(401).json({ message: 'Token JWT non valido' });
    }
};

module.exports = verifyToken