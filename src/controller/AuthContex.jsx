// AuthContext.jsx
import React, { createContext, useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { useNavigate } from "react-router-dom";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const checkLoggedIn = async () => {
            try {
                const loggedIn = await isUserLoggedIn();
                if (loggedIn) {
                    setUser(loggedIn);
                }
            } catch (error) {
                console.error('Errore durante il controllo del login:', error);
            }
        };

        checkLoggedIn();
    }, []);

    const login = async (credentials) => {
        try {
            const response = await axios.post('/login', credentials);
            setUser(response.data.user);
            localStorage.setItem('token', response.data.token);
        } catch (error) {
            console.error('Errore durante il login:', error);
            throw error;
        }
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem('token');
        navigate('/login');
    };

    const register = async ({ username, password, nome, cognome }) => {
        try {
            const response = await axios.post('/register', { username, password, nome, cognome });
            setUser(response.data.user);
            localStorage.setItem('token', response.data.token);
        } catch (error) {
            console.error('Errore durante la registrazione:', error);
            throw error;
        }
    };

    const isUserLoggedIn = async () => {
        // Esempio di implementazione di base per verificare se l'utente è loggato
        const token = localStorage.getItem('token');
        return !!token; // Ritorna true se il token è presente, altrimenti false
    };

    const contextValue = {
        user,
        login,
        logout,
        register
    };

    return (
        <AuthContext.Provider value={contextValue}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
