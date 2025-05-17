import {Routes, Route, useNavigate, useHref} from "react-router-dom";
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
import {HeroUIProvider} from "@heroui/react";
import i18n from "i18next";
import HttpBackend from "i18next-http-backend";
import {initReactI18next} from "react-i18next";

i18n.use(HttpBackend)
    .use(initReactI18next)
    .init({
        fallbackLng: "en",
        backend: {
            loadPath: "/locales/{{lng}}/{{ns}}.json"
        },
        interpolation: {
            escapeValue: false
        }
    });

const App: React.FC = () => {
    const navigate = useNavigate();

    React.useEffect(() => {
        const theme = localStorage.getItem("theme");

        if (theme === "dark") {
            document.documentElement.classList.add("dark");
        }
    }, []);

    return (
        <HeroUIProvider navigate={navigate} useHref={useHref}>
            <Routes>
                <Route path="*" element={<NotFound/>}/>

                <Route path="/login" element={<Login/>}/>
                <Route path="/register" element={<Register/>}/>

                <Route path="/" element={<Home/>}/>

                <Route element={<ProtectedRoutes/>}>
                    <Route element={<Dashboard/>}>
                        <Route path={"/dashboard/home"} element={<HomeDashboard/>}/>
                        <Route path={"/dashboard/analytics"} element={<Analytics/>}/>
                        <Route path={"/dashboard/bills"} element={<Bills/>}/>
                        <Route path={"/dashboard/profile"} element={<Profile/>}/>
                    </Route>
                </Route>
            </Routes>
        </HeroUIProvider>
    );
};

export default App;