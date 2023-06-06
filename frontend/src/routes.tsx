import {
  BrowserRouter,
  Route,
  Routes
} from "react-router-dom";
import {
  Login,
  Home,
  PaginaNaoEncontrada,
  Tests,
  ListaSolicitacoes,
  ListaUsuarios,
  CriarGrupo,
  CriarSolicitacao,
  ListGrupos,
  NovoUsuario,
  Notificacoes
} from "./pages";
import { useContexto } from "./context/contexto";
import PaginaComHeader from "./components/PaginaComHeader";
import { useEffect, useState } from "react";
import api from "./services/api";
import Carregando from "./pages/Carregando";
import Usuarios from "./services/Usuarios";

export default function AppRouter() {
  const { usuario, setUsuario } = useContexto();
  const [carregando, setCarregando] = useState(true);

  useEffect(() => {
    if (sessionStorage.length > 0) {
      const { email, password } = sessionStorage;
      Usuarios.login({ email, password })
        .then(data => {
          const { accessToken } = data;
          api.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;
          setUsuario(data);
          setCarregando(false);
        });
    }
    console.log(import.meta.env.VITE_BACKEND_BASEURL);
  }, []);
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Login />} />
        {usuario && (
          <>
            <Route
              path='/home'
              element={<PaginaComHeader elemento={<Home />} />}
            />
            <Route
              path="/notificacoes"
              element={<PaginaComHeader elemento={<Notificacoes />} />}
            />
            {usuario.permissions.find(perm => perm.id >= 8 && perm.id <= 12) && (
              <>
                <Route
                  path='/solicitacoes'
                  element={<PaginaComHeader elemento={<ListaSolicitacoes />} />}
                />
              </>
            )}
            {usuario.permissions.find(perm => perm.id == 14) &&
              <>
                <Route
                  path='/solicitacoes-para-avaliar'
                  element={<PaginaComHeader elemento={<ListaSolicitacoes />} />}
                />
              </>
            }
            {usuario.permissions.find(perm => perm.id == 13) &&
              <>
                <Route
                  path='/solicitacoes-em-producao'
                  element={<PaginaComHeader elemento={<ListaSolicitacoes />} />}
                />
              </>
            }
            {usuario.permissions.find(perm => perm.id == 7) &&
              <>
                <Route
                  path='/minhas-solicitacoes'
                  element={<PaginaComHeader elemento={<ListaSolicitacoes />} />}
                />
                <Route
                  path='/minhas-solicitacoes/:id'
                  element={<PaginaComHeader elemento={<ListaSolicitacoes />} />}
                />
                <Route
                  path='/criar-solicitacao'
                  element={<PaginaComHeader elemento={<CriarSolicitacao />} />}
                />
              </>}
            {usuario.permissions.find(perm => perm.id == 8) &&
              <Route
                path='/editar-solicitacao/:id'
                element={<PaginaComHeader elemento={<CriarSolicitacao />} />}
              />}
            {usuario.permissions.find(perm => perm.id >= 1 && perm.id <= 3) &&
              <Route
                path='/usuarios'
                element={<PaginaComHeader elemento={<ListaUsuarios />} />}
              />}
            {usuario.permissions.find(perm => perm.id == 1) &&
              <Route
                path='/criar-usuario'
                element={<PaginaComHeader elemento={<NovoUsuario />} />}
              />}
            {usuario.permissions.find(perm => perm.id == 2) &&
              <Route
                path='/editar-usuario/:id'
                element={<PaginaComHeader elemento={<NovoUsuario />} />}
              />}
            {usuario.permissions.find(perm => perm.id == 4) &&
              <Route
                path='/criar-grupo'
                element={<PaginaComHeader elemento={<CriarGrupo />} />}
              />}
            {usuario.permissions.find(perm => perm.id == 5) &&
              <Route
                path='/editar-grupo/:id'
                element={<PaginaComHeader elemento={<CriarGrupo />} />}
              />}
            {usuario.permissions.find(perm => perm.id >= 4 && perm.id <= 6) &&
              <Route
                path='/grupos'
                element={<PaginaComHeader elemento={<ListGrupos />} />}
              />}
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