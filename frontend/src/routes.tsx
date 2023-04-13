import { BrowserRouter, Route, Routes } from "react-router-dom";
import {Home, Login, PaginaComHeader, PaginaNaoEncontrada, Tests} from "./pages";
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
                    <Route path='*' element={<PaginaNaoEncontrada />} />
                </Routes>
            </BrowserRouter>
        </>
    )
}