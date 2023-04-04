import { useState, useEffect } from "react";
import PopUp from "../../components/PopUp";

export default function ExcluirSolicitacao () {
    // const [selecionado, setSelecionado] = useState<number>();
    const [popup, setPopup] = useState(false);

    return (
        <>
            <button onClick={() => setPopup(true)}>abrir</button>
            <PopUp
            titulo="Confirmar Exclusão?"
            visivel={popup}
            onClose={() => setPopup(false)}
            >
                <button>sim</button>
                <button>nao</button>
            </PopUp>
        </>
    );
}