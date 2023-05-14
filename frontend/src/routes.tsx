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
  ListaSolicitacoes,
  ListaUsuarios,
  CriarGrupo,
  CriarSolicitacao
} from "./pages";
import { useContexto } from "./context/contexto";
import PaginaComHeader from "./components/PaginaComHeader";
import { useEffect, useState } from "react";
import api from "./services/api";
import Carregando from "./pages/Carregando";
import { CriarUsuario } from "./popUps";
import NovoUsuario from "./pages/NovoUsuario";

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
              <>
                <Route
                  path='/home'
                  element={<PaginaComHeader elemento={<ListaSolicitacoes />} />}
                />
                <Route
                  path='/criar-solicitacao'
                  element={<PaginaComHeader elemento={<CriarSolicitacao />} />}
                />
              </>
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
                path='/editar-solicitacao/:id'
                element={<PaginaComHeader elemento={<CriarSolicitacao />} />}
              />
              <Route
                path='/usuarios'
                element={<PaginaComHeader elemento={<ListaUsuarios />} />}
              />
              <Route
                path='/criar-usuario'
                element={<PaginaComHeader elemento={<NovoUsuario />} />}
              />
              <Route
                path='/editar-usuario/:id'
                element={<PaginaComHeader elemento={<NovoUsuario />} />}
              />
              <Route
                path='/criar-grupo'
                element={<PaginaComHeader elemento={<CriarGrupo />} />}
              />
            </>)}
          </>
        )}
        <Route
          path='*'
          element={carregando ?
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