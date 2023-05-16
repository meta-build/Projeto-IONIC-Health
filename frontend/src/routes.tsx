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
  CriarSolicitacao
} from "./pages";
import { useContexto } from "./context/contexto";
import PaginaComHeader from "./components/PaginaComHeader";
import { useEffect, useState } from "react";
import api from "./services/api";
import Carregando from "./pages/Carregando";
import NovoUsuario from "./pages/NovoUsuario";
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
            {usuario.role.permissions.find(perm => perm.id >= 8 && perm.id <= 12) && (
              <>
                <Route
                  path='/solicitacoes'
                  element={<PaginaComHeader elemento={<ListaSolicitacoes />} />}
                />
              </>
            )}
            {usuario.role.permissions.find(perm => perm.id == 14) &&
              <>
                <Route
                  path='/solicitacoes-para-avaliar'
                  element={<PaginaComHeader elemento={<ListaSolicitacoes />} />}
                />
              </>
            }
            {usuario.role.permissions.find(perm => perm.id == 13) &&
              <>
                <Route
                  path='/solicitacoes-em-producao'
                  element={<PaginaComHeader elemento={<ListaSolicitacoes />} />}
                />
              </>
            }
            {usuario.role.permissions.find(perm => perm.id == 7) &&
              <>
                <Route
                  path='/minhas-solicitacoes'
                  element={<PaginaComHeader elemento={<ListaSolicitacoes />} />}
                />
                <Route
                  path='/criar-solicitacao'
                  element={<PaginaComHeader elemento={<CriarSolicitacao />} />}
                />
              </>}
            {usuario.role.permissions.find(perm => perm.id == 8) &&
              <Route
                path='/editar-solicitacao/:id'
                element={<PaginaComHeader elemento={<CriarSolicitacao />} />}
              />}
            {usuario.role.permissions.find(perm => perm.id >= 1 && perm.id <= 3) &&
              <Route
                path='/usuarios'
                element={<PaginaComHeader elemento={<ListaUsuarios />} />}
              />}
            {usuario.role.permissions.find(perm => perm.id == 1) &&
              <Route
                path='/criar-usuario'
                element={<PaginaComHeader elemento={<NovoUsuario />} />}
              />}
            {usuario.role.permissions.find(perm => perm.id == 2) &&
              <Route
                path='/editar-usuario/:id'
                element={<PaginaComHeader elemento={<NovoUsuario />} />}
              />}
            {usuario.role.permissions.find(perm => perm.id == 4) &&
              <Route
                path='/criar-grupo'
                element={<PaginaComHeader elemento={<CriarGrupo />} />}
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