import React, { useState, useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import { Profile } from "@/pages/dashboard";
import { Home } from '@/pages';
import axios from 'axios';
import { SignIn, SignUp } from '@/pages/auth';
import Squad from "@/pages/dashboard/squad.jsx";

axios.defaults.baseURL = 'http://localhost:4000'
const App = () => {
    const [peopleData, setPeopleData] = useState([]);
    useEffect(() => {
        const fetchPeopleData = async () => {
            try {
                const response = await axios.get('/api/people');
                setPeopleData(response.data);
            } catch (error) {
                console.error('Errore nel caricamento dei dati:', error);
            }
        };

        fetchPeopleData();
    }, []);
    return (

        <Routes>
            <Route path="/login" element={<SignIn />} />
            <Route path="/register" element={<SignUp />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/squadbuilder" element={<Squad data={peopleData} />} />
            <Route path="/" element={<Home />} />
        </Routes>


    );
};

export default App;
