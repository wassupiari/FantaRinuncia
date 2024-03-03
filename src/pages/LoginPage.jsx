import NavbarSimple from "../components/navbar.jsx";
import Footer from "../components/footer.jsx";
import React, { useState } from 'react';
import axios from "axios";
import {Typography} from "@material-tailwind/react";

const LoginPage = () => {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');


    const loginUser = async (username, password) => {
        try {
            // Effettua una richiesta POST al backend per il login
            const response = await axios.post('http://localhost:3000/login', {
                username,
                password,
            });
            // Se il login ha successo, gestisci la risposta dal backend come necessario
            console.log(response.data);
            // Esegui il reindirizzamento o mostra un messaggio di successo all'utente
        } catch (error) {
            if (error.response && error.response.data && error.response.data.message) {
                setErrorMessage(error.response.data.message);
            } else {
                setErrorMessage('Errore durante il login');
            }
        }
    };

    return (
        <>
            <NavbarSimple />
        <div className="mx-auto max-w-screen-xl px-4 py-16 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-lg text-center">
                <h1 className="text-2xl font-bold sm:text-3xl">Bentornato ✌️</h1>

                <p className="mt-4 text-gray-500">
                    Accedi per partecipare al fantarinuncia.
                </p>
            </div>

            <form action="#" className="mx-auto mb-0 mt-8 max-w-md space-y-4">
                <div>
                    <label htmlFor="username" className="sr-only">Username</label>

                    <div className="relative">
                        <input
                            type="text"
                            className="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm"
                            placeholder="Inserisci username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                        />

                        <span className="absolute inset-y-0 end-0 grid place-content-center px-4">
          <svg
              xmlns="http://www.w3.org/2000/svg"
              className="size-4 text-gray-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
          >
            <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207"
            />
          </svg>
        </span>
                    </div>
                </div>

                <div>
                    <label htmlFor="password" className="sr-only">Password</label>

                    <div className="relative">
                        <input
                            type="password"
                            className="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm"
                            placeholder="Inserisci password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />

                        <span className="absolute inset-y-0 end-0 grid place-content-center px-4">
          <svg
              xmlns="http://www.w3.org/2000/svg"
              className="size-4 text-gray-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
          >
            <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
            />
            <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
            />
          </svg>
        </span>
                    </div>
                </div>

                <div className="flex items-center justify-between">

                        <Typography
                            as="li"
                            variant="small"
                            color="blue-gray"
                            className="p-auto font-small"
                        >
                            <p className="text-sm text-gray-500">
                                No account?
                                <a href="/auth/register"
                                              className="flex items-end hover:text-blue-500 transition-colors">
                                Registrati
                            </a>
                            </p>
                        </Typography>


                    <button
                        className="align-middle select-none font-bold text-center uppercase transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none text-xs py-3 px-6 rounded-lg bg-indigo-900 text-white shadow-md shadow-indigo-900/10 hover:shadow-lg hover:shadow-indigo-900/20 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none flex items-center gap-3"
                        type="submit" onClick={() => loginUser(username, password)}>
                        Sign in
                    </button>
                    {errorMessage && <p>{errorMessage}</p>}
                </div>
            </form>
        </div>
            <Footer/>
        </>
    );
}

export default LoginPage