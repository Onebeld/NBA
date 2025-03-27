import { BrowserRouter, Routes, Route } from "react-router-dom";
import * as React from "react";
import Home from "./components/home/Home.tsx";
import NotFound from "./components/not-found/NotFound.tsx";

const App: React.FC = () => (
    <BrowserRouter>
        <Routes>
            <Route path="*" element={<NotFound/>} />

            <Route path="/" element={<Home />} />
        </Routes>
    </BrowserRouter>
);

export default App;