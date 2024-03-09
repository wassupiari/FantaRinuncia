import React from 'react';
import {  Route, Routes  } from 'react-router-dom';
import { Profile } from "@/pages/dashboard";
import { Home } from '@/pages';
import axios from 'axios'
import { SignIn, SignUp } from '@/pages/auth';

axios.defaults.baseURL = 'http://localhost:4000'
const App = () => {
    return (

        <Routes>
            <Route path="/login" element={<SignIn />} />
            <Route path="/register" element={<SignUp />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/" element={<Home />} />
        </Routes>


    );
};

export default App;
