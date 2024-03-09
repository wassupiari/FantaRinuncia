import React, { createContext, useState, useContext } from 'react';
import axios from 'axios';
import {useNavigate} from "react-router-dom";


export const AuthContext = createContext();


export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const navigate = useNavigate();

    // Funzione per effettuare il login
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
        navigate('/login')
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

    const contextValue = {
        user,
        login,
        logout,
        register
    };

    // Forniamo il contesto ai componenti figli
    return (
        <AuthContext.Provider value={contextValue}>
            {children}
        </AuthContext.Provider>
    );
};

// Funzione di utilità per accedere al contesto di autenticazione
export const useAuth = () => useContext(AuthContext);
