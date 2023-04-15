import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Home, Login, PaginaComHeader, PaginaNaoEncontrada, Tests } from "./pages";
import Solicitacoes from "./pages/Solicitacoes";
import { useEffect } from "react";
import { useContexto } from "./context/contexto";

export default function AppRouter() {

  const {token, setToken} = useContexto();

  useEffect(() => {
    const tokenSession = sessionStorage.getItem('token');
    if (tokenSession) {
      setToken(tokenSession);
    }
  }, []);
  
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Login />} />

          {token && (
          <>
            <Route path='/home' element={<PaginaComHeader elemento={<Home />} />} />
            <Route path='/solicitacoes' element={<PaginaComHeader elemento={<Solicitacoes />} />} />
            <Route path='/tests' element={<Tests />} />
          </>  
          )}

          <Route path='*' element={<PaginaNaoEncontrada />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}