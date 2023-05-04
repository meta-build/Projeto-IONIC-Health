import { createContext, useContext, useState } from "react";
import { UsuarioContext } from "../types";

interface UsuarioProps {
  usuario: UsuarioContext;
  setUsuario: React.Dispatch<React.SetStateAction<UsuarioContext>>;
}

const ContextoUsuario = createContext({} as UsuarioProps);

function ContextoProvider({ children }: any) {
  const [usuario, setUsuario] = useState<UsuarioContext>(undefined)

  return (
    <ContextoUsuario.Provider value={{ usuario, setUsuario }}>
      {children}
    </ContextoUsuario.Provider>
  );
}

function useContexto() {
  const contexto = useContext(ContextoUsuario);
  return contexto;
}

export {
  ContextoProvider,
  useContexto
}

