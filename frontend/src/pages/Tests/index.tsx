<<<<<<< HEAD
import { useEffect, useState } from "react";
import CriarSolicitacao from "../../popUps/CriarSolicitacao";
import Anexar from "../../components/Botoes/Anexar";
import { BotaoIcon, IconeClicavel } from "../../components/Botoes";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBell } from "@fortawesome/free-regular-svg-icons";
import BellIconDropdown from "../../popUps/VizualizarNotificacao";
import AddArquivo from "../../components/Botoes/AddArquivo";
import VizualizarSolicitacao from "../../popUps/VizualizarSolicitacao";

export default function Tests () {
    // const [selecionado, setSelecionado] = useState<number>();
    const [popup, setPopup] = useState(false);

    useEffect(() => {
        console.log(popup)
    }, [popup])
    function handleButtonClick(): void {
        throw new Error("Function not implemented.");
    }


    function setPopupSolicitacao(arg0: boolean): void {
        throw new Error("Function not implemented.");
    }

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
            {/* <Anexar handleClick={() => console.log('foi')}>Teste</Anexar> */}

            
                <FontAwesomeIcon icon={faBell}/>
            
                <BellIconDropdown />
                <AddArquivo children={"arq.jpg"} onClose={function (): void {
                throw new Error("Function not implemented.");
                } } />

                

                <VizualizarSolicitacao aberto={popup} onClose={() => setPopupSolicitacao(false)}/>
            
            
            
=======
export default function Tests () {
    return (
        <>
>>>>>>> dfd2ff03740720490063e964ed7f389a8e2298dd
        </>
    );
}