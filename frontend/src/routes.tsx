import { BrowserRouter, Route, Routes } from "react-router-dom";
import {Home, Login, PaginaComHeader, Tests} from "./pages";
import Solicitacoes from "./pages/Solicitacoes";

export default function AppRouter() {
    return (
        <>
            <BrowserRouter>
                <Routes>
                    <Route path='/' element={<Login />} />
                    <Route path='/home' element={<PaginaComHeader elemento={<Home />}/>}/>
                    <Route path='/solicitacoes' element={<PaginaComHeader elemento={<Solicitacoes />}/>} />
                    <Route path='/tests' element={<Tests />} />
                </Routes>
            </BrowserRouter>
        </>
    )
}