import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from './pages/HomePage';
import LoginPage from "./pages/LoginPage.jsx";
import RegisterPage from "./pages/RegisterPage.jsx";
import Dashboard from "./pages/DashboardPage.jsx";


const App = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<HomePage />}/>
                <Route element={<LoginPage/>} path="/auth/login"/>
                <Route element={<RegisterPage/>} path="/auth/register"/>
                <Route element={<Dashboard/>} path="/dashboard/:username"/>
            </Routes>
        </BrowserRouter>
    );
};

export default App
