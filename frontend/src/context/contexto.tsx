import { createContext, useContext, useState } from "react";
import Usuario from "../types/Usuario";

interface UsuarioProps {
    usuario: Usuario;
    setUsuario: React.Dispatch<React.SetStateAction<Usuario>>;
}

const UsuarioContext = createContext({} as UsuarioProps);

function ContextoProvider ({children}: any) {
    const [usuario, setUsuario] = useState<Usuario>(undefined)

    return (
        <UsuarioContext.Provider value={{usuario, setUsuario}}>
            {children}
        </UsuarioContext.Provider>
    );
}

function useContexto () {
    const contexto = useContext(UsuarioContext);
    return contexto;
}

export {
    ContextoProvider,
    useContexto
}

