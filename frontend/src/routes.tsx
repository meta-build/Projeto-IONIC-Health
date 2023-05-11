import {
  BrowserRouter,
  Route,
  Routes
} from "react-router-dom";
import {
  Login,
  HomeSolicitante,
  HomeAvaliador,
  HomeAdm,
  SolicitacoesAdm,
  UsuariosAdm,
  PaginaNaoEncontrada,
  Tests,
  ListaSolicitacoes
} from "./pages";
import { useContexto } from "./context/contexto";
import PaginaComHeader from "./components/PaginaComHeader";
import { useEffect, useState } from "react";
import api from "./services/api";
import Carregando from "./pages/Carregando";

export default function AppRouter() {
  const { usuario, setUsuario } = useContexto();
  const [carregando, setCarregando] = useState(true);

  useEffect(() => {
    if (sessionStorage.length > 0) {
      const { id, token, grupo, nome } = sessionStorage;
      setUsuario({ id, token, grupo, nome });
      api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    }
    setCarregando(false);
  }, []);
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Login />} />
        {usuario && (
          <>
            {usuario.grupo == 2 && (
              <Route
                path='/home'
                element={<PaginaComHeader elemento={<ListaSolicitacoes />} />}
              />
            )}
            {usuario.grupo >= 3 && (
              <Route
                path='/home'
                element={<PaginaComHeader elemento={<ListaSolicitacoes />} />}
              />
            )}
            {usuario.grupo == 1 && (<>
              <Route
                path='/home'
                element={<PaginaComHeader elemento={<HomeAdm />} />}
              />
              <Route
                path='/solicitacoes'
                element={<PaginaComHeader elemento={<ListaSolicitacoes />} />}
              />
              <Route
                path='/usuarios'
                element={<PaginaComHeader elemento={<UsuariosAdm />} />}
              />
            </>)}
          </>
        )}
        <Route
          path='*'
          element={ carregando ?
            <Carregando /> :
            <PaginaNaoEncontrada />
          } />
          <Route
            path='/tests'
            element={<Tests />}
          />
      </Routes>
    </BrowserRouter>
  );
}