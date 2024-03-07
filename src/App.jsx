import {  Routes, Route ,Navigate} from "react-router-dom";

import { Profile } from "@/pages/dashboard";
import {Home} from '@/pages'
import {SignIn, SignUp} from '@/pages/auth'



const App = () => {
    return (

            <Routes>
                <Route path="/" exact element={<Home />} />
                <Route path="/auth/login" index element={<SignIn />} />
                <Route path="/auth/register" index element={<SignUp />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>

    );
};

export default App
