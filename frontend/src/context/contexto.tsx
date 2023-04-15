import { createContext, useContext, useState } from "react";

interface UsuarioProps {
    token: string;
    setToken: React.Dispatch<React.SetStateAction<string>>;
}

const UsuarioContext = createContext({} as UsuarioProps);

function ContextoProvider ({children}: any) {
    const [token, setToken] = useState('');

    return (
        <UsuarioContext.Provider value={{token, setToken}}>
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

