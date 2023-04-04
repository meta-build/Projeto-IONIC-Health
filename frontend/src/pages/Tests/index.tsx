import BotaoNota from "../../components/BotaoNota";
import { useEffect, useState } from "react";
import GoogleIcon from "../../components/GoogleIcon";
import IconeClicavel from "../../components/IconeClicavel";
import ItemLista from "../../components/ItemLista";
import styles from './Tests.module.scss';
import AcaoNotas from "../../components/ItemLista/ItemAcoes/AcaoNotas";
import AcaoEditarExcluir from "../../components/ItemLista/ItemAcoes/AcaoEditarExcluir";
import AcaoProducao from "../../components/ItemLista/ItemAcoes/AcaoProducao";
import PopUp from "../../components/PopUp";
import { Button } from "react-bootstrap";
import InputPopup from "../../components/InputPopup";
import CriarSolicitacao from "../../popUps/CriarSolicitacao";
import axios from "axios";
import EditarSolicitacao from "../../popUps/EditarSolicitacao"

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
        </>
    );
}