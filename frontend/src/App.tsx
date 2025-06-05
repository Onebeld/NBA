import {Routes, Route, useNavigate, useHref, Navigate} from "react-router-dom";
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
import LanguageDetector from "i18next-browser-languagedetector";
import {initReactI18next} from "react-i18next";
import {Suspense} from "react";
import { AuthProvider } from "./contexts/AuthContext";

i18n.use(HttpBackend)
    .use(LanguageDetector)
    .use(initReactI18next)
    .init({
        supportedLngs: ["en", "ru"],
        lowerCaseLng: true,
        detection: {
            lookupQuerystring: "lng",
            convertDetectedLanguage: lng => {
                return lng.split("-")[0];
            }
        },
        load: "languageOnly",
        fallbackLng: "en",
        backend: {
            loadPath: "/locales/{{lng}}/{{ns}}.json"
        },
        interpolation: {
            escapeValue: false
        },
        react: {
            useSuspense: false
        }
    });

const AppContent: React.FC = () => {
    const navigate = useNavigate();

    React.useEffect(() => {
        const theme = localStorage.getItem("theme");

        if (theme === "dark") {
            document.documentElement.classList.add("dark");
        }
    }, []);

    return (
        <HeroUIProvider navigate={navigate} useHref={useHref}>
            <Suspense fallback={<div>Loading...</div>}>
                <Routes>
                    <Route path="*" element={<NotFound/>}/>

                    <Route path="/login" element={<Login/>}/>
                    <Route path="/register" element={<Register/>}/>

                    <Route path="/" element={<Home/>}/>

                    <Route element={<ProtectedRoutes/>}>
                        <Route path="/dashboard" element={<Navigate to="/dashboard/home" replace />} />
                        <Route element={<Dashboard/>}>
                            <Route path={"/dashboard/home"} element={<HomeDashboard/>}/>
                            <Route path={"/dashboard/analytics"} element={<Analytics/>}/>
                            <Route path={"/dashboard/bills"} element={<Bills/>}/>
                            <Route path={"/dashboard/profile"} element={<Profile/>}/>
                        </Route>
                    </Route>
                </Routes>
            </Suspense>
        </HeroUIProvider>
    );
};

const App: React.FC = () => {
    return (
        <AuthProvider>
            <AppContent />
        </AuthProvider>
    );
};

export default App;