import {  Routes, Route ,Navigate} from "react-router-dom";

import { Dashboard, Auth } from "@/layouts";
import {Home} from '@/pages'


const App = () => {
    return (

            <Routes>
                <Route path="/home" element={<Home />} />
                <Route path="/auth/*" element={<Auth />} />
                <Route path="/dashboard/*" element={<Dashboard />} />
                <Route path="*" element={<Navigate to="/home" replace />} />
            </Routes>

    );
};

export default App
