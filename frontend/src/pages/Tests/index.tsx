import { useEffect, useState } from "react";
import CriarSolicitacao from "../../popUps/CriarSolicitacao";
import Anexar from "../../components/Botoes/Anexar";

export default function Tests () {
    // const [selecionado, setSelecionado] = useState<number>();
    const [popup, setPopup] = useState(false);

    useEffect(() => {
        console.log(popup)
    }, [popup])
    return (
        <>
            {/* <button onClick={() => setPopup(true)}>abrir</button>
            <PopUp
            titulo="Popup"
            visivel={popup}
            onClose={() => setPopup(false)}
            >
                <h1>conteutod</h1>
            </PopUp> */}
            {/* <NovaSolicitacao /> */}
            <button onClick={() => setPopup(true)}>Abrir</button>
            <CriarSolicitacao aberto={popup} onClose={() => setPopup(false)}/>
            <Anexar handleClick={() => console.log('foi')}>Teste</Anexar>
            
            
        </>
    );
}