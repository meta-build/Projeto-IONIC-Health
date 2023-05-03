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
  Tests
} from "./pages";
import { useContexto } from "./context/contexto";
import PaginaComHeader from "./components/PaginaComHeader";

export default function AppRouter() {
  const { usuario } = useContexto();

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Login />} />
        {usuario && (
          <>
            {usuario.getGrupo() == 2 && (
              <Route
                path='/home'
                element={<PaginaComHeader elemento={<HomeSolicitante />} />}
              />
            )}
            {usuario.getGrupo() >= 3 && (
              <Route
                path='/home'
                element={<PaginaComHeader elemento={<HomeAvaliador />} />}
              />
            )}
            {usuario.getGrupo() == 1 && (<>
              <Route
                path='/home'
                element={<PaginaComHeader elemento={<HomeAdm />} />}
              />
              <Route
                path='/solicitacoes'
                element={<PaginaComHeader elemento={<SolicitacoesAdm />} />}
              />
              <Route
                path='/usuarios'
                element={<PaginaComHeader elemento={<UsuariosAdm />} />}
              />
            </>)}
            <Route
              path='/tests'
              element={<Tests />}
            />
          </>
        )}
        <Route
          path='*'
          element={<PaginaNaoEncontrada />}
        />
      </Routes>
    </BrowserRouter>
  );
}