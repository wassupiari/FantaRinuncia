import {NavbarSimple,Footer}from "@/widgets/layout/index.js";

import React, { useState } from 'react';
import axios from 'axios';
import {Typography} from "@material-tailwind/react";


export function SignUp (){
    const [nome, setFirstName] = useState('');
    const [cognome, setLastName] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const handleRegister = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:4000/auth/register', {
                nome,
                cognome,
                username,
                password,
            });
            console.log(response.data); // Gestisci la risposta dal backend come necessario
            // Esegui il reindirizzamento o mostra un messaggio di successo all'utente
        } catch (error) {
            // Controlla se la risposta contiene un messaggio di errore personalizzato dal server
            if (error.response && error.response.data && error.response.data.message) {
                setErrorMessage(error.response.data.message);
            } else {
                setErrorMessage('Errore durante la registrazione');
            }
        }
    };

    return (
        <>
            <NavbarSimple />
            <div className="mx-auto max-w-screen-xl px-4 py-16 sm:px-6 lg:px-8">
                <div className="mx-auto max-w-lg text-center">
                    <h1 className="text-2xl font-bold sm:text-3xl">Benvenuto 👋</h1>

                    <p className="mt-4 text-gray-500">
                        Registrati per partecipare al fantarinuncia.
                    </p>
                </div>

                <form onSubmit={handleRegister} className="mx-auto mb-0 mt-8 max-w-md space-y-4">
                    <div>
                        <label htmlFor="username" className="sr-only">Username</label>

                        <div className="relative">
                            <input
                                type="text"
                                className="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm"
                                placeholder="Inserisci username"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)} required

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
                        <label htmlFor="nome" className="sr-only">Nome</label>

                        <div className="relative">
                            <input
                                type="text"
                                className="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm"
                                placeholder="Inserisci nome"
                                value={nome}
                                onChange={(e) => setFirstName(e.target.value)} required

                            />

                            <span className="absolute inset-y-0 end-0 grid place-content-center px-4">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5}
                                 stroke="currentColor"
                                 className="size-4 text-gray-400">
                              <path strokeLinecap="round" strokeLinejoin="round"
                                    d="M9 15 3 9m0 0 6-6M3 9h12a6 6 0 0 1 0 12h-3"/>
                            </svg>
                            </span>
                        </div>
                    </div>

                    <div>
                        <label htmlFor="nome" className="sr-only">Cognome</label>

                        <div className="relative">
                            <input
                                type="text"
                                className="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm"
                                placeholder="Inserisci cognome"
                                value={cognome}
                                onChange={(e) => setLastName(e.target.value)} required

                            />

                            <span className="absolute inset-y-0 end-0 grid place-content-center px-4">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"
                                 className="size-4 text-gray-400">
                              <path strokeLinecap="round" strokeLinejoin="round" d="M9 15 3 9m0 0 6-6M3 9h12a6 6 0 0 1 0 12h-3"/>
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
                                onChange={(e) => setPassword(e.target.value)} required

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
                                Hai già un account?
                                <a href="/auth/login"
                                   className="flex items-end hover:text-blue-500 transition-colors">
                                    Accedi
                                </a>
                            </p>
                        </Typography>


                        <button
                            className="align-middle select-none font-bold text-center uppercase transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none text-xs py-3 px-6 rounded-lg bg-indigo-900 text-white shadow-md shadow-indigo-900/10 hover:shadow-lg hover:shadow-indigo-900/20 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none flex items-center gap-3"
                            type="submit">
                            Registrati
                        </button>
                        {errorMessage && <p>{errorMessage}</p>}
                    </div>
                </form>
            </div>
            <Footer/>
        </>
    );
}

export default SignUp