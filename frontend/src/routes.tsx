import { BrowserRouter, Route, Routes } from "react-router-dom";
import {Home, Tests} from "./pages";
import Menu from "./components/Menu";
import Solicitacoes from "./pages/Solicitacoes";

export default function AppRouter() {
    return (
        <>
            <Menu />
            <BrowserRouter>
                <Routes>
                    <Route path='/' element={<Home />} />
                    <Route path='/solicitacoes' element={<Solicitacoes />} />
                    <Route path='/tests' element={<Tests />} />
                </Routes>
            </BrowserRouter>
        </>
    )
}