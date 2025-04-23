import {BrowserRouter, Routes, Route} from "react-router-dom";
import * as React from "react";
import Home from "./pages/Home.tsx";
import NotFound from "./pages/NotFound.tsx";
import ProtectedRoutes from "./utils/ProtectedRoutes.tsx";
import Login from "./pages/Login.tsx";
import Register from "./pages/Register.tsx";
import Dashboard from "./pages/Dashboard.tsx";
import HomeDashboard from "./pages/dashboard/HomeDashboard.tsx";
import Bills from "./pages/dashboard/Bills.tsx";
import Profile from "./pages/dashboard/Profile.tsx";
import Analytics from "./pages/dashboard/Analytics.tsx";

const App: React.FC = () => {
    const [theme, setTheme] = React.useState("light");

    const selectedTheme = localStorage.getItem("theme");

    if (selectedTheme) {
        document.querySelector('body')?.setAttribute('data-theme', selectedTheme);
    }

    return (
        <BrowserRouter>
            <Routes>
                <Route path="*" element={<NotFound/>} />

                <Route path="/login" element={<Login/>} />
                <Route path="/register" element={<Register/>} />

                <Route path="/" element={<Home/>} />

                <Route element={<ProtectedRoutes/>}>
                    <Route path={"/dashboard"} element={<Dashboard/>}>
                        <Route index element={<HomeDashboard/>} />
                        <Route path={"/dashboard/analytics"} element={<Analytics/>} />
                        <Route path={"/dashboard/bills"} element={<Bills/>} />
                        <Route path={"/dashboard/profile"} element={<Profile/>} />
                    </Route>
                </Route>
            </Routes>
        </BrowserRouter>
    );
};

export default App;