import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Home, Login, PaginaComHeader, PaginaNaoEncontrada, Tests } from "./pages";
import { useEffect } from "react";
import { useContexto } from "./context/contexto";
import Usuario from "./types/Usuario";
import HomeSolicitante from "./pages/HomeSolicitante";
import HomeAvaliador from "./pages/HomeAvaliador";
import HomeAdm from "./pages/HomeAdm";
import SolicitacoesAdm from "./pages/SolicitacoesAdm";
import UsuariosAdm from "./pages/UsuariosAdm";
import api from "./services/api";

export default function AppRouter() {

  const {usuario, setUsuario} = useContexto();

  useEffect(() => {
    if (sessionStorage.length > 0) {
      const {id, token, grupo} = sessionStorage;
      console.log(id, token, grupo);
      setUsuario(new Usuario(id, token, grupo));
      api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    }
  }, [])

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Login />} />

          {usuario && (
            <>
              {usuario.getGrupo() == 2 && (
                  <Route path='/home' element={<PaginaComHeader elemento={<HomeSolicitante />} />} />
              )}
              {usuario.getGrupo() >= 3 && (
                <Route path='/home' element={<PaginaComHeader elemento={<HomeAvaliador />} />} />
              )}
              {usuario.getGrupo() == 1 && (<>
                  <Route path='/home' element={<PaginaComHeader elemento={<HomeAdm />} />} />
                  <Route path='/solicitacoes' element={<PaginaComHeader elemento={<SolicitacoesAdm />} />} />
                  <Route path='/usuarios' element={<PaginaComHeader elemento={<UsuariosAdm />} />} />
              </>)}
              <Route path='/tests' element={<Tests />} />
            </>  
          )}

          <Route path='*' element={<PaginaNaoEncontrada />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}