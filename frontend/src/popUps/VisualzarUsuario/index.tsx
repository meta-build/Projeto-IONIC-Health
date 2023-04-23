import classNames from "classnames";
import PopUp from "../../components/PopUp";
import styles from './VisualizarUsuario.module.scss';
import { useState } from "react";
import { BotaoPopup } from "../../components/Botoes";
import BotaoPreenchido from "../../components/Botoes/BotaoPreenchido";
import EditarUsuario from "../EditarUsuario";
import ConfirmarExclusaoUsuario from "../ConfirmarExclusaoUsuario";

interface Props {
    aberto: boolean;
    onClose: () => void;
}

export default function VisualizarUsuario (props: Props) {
    // pegar valor de cada campo
    const [nome, setNome] = useState('Fulano');
    const [email, setEmail] = useState('fulano@email.com');
    const [grupo, setGrupo] = useState('Solicitante');

    const [popupEditar, setPopupEditar] = useState(false);
    const [popupExcluir, setPopupExcluir] = useState(false);

    return(
        <PopUp
        titulo={`Usuário ${nome}`}
        visivel={props.aberto}
        onClose={props.onClose}>
            <div className={styles.form}>
                {/* cada linha é feito com div, observar estilização aplicada */}
                <div className={styles.linha}>
                    {/* cada campo é feito com span, onde dentro tem label e o input */}
                    <span className={classNames({
                        [styles.campo]: true,
                        [styles['campo-preenchido']]: true
                    })}>
                        <label>Email:</label>

                        {/* input possui estilização de erro caso o usuário tente enviar um formulário sem um dos campos preenchidos */}
                        <span>{email}</span>
                    </span>
                    <span className={classNames({
                        [styles.campo]: true
                    })}>
                        <label>Grupo</label>

                        {/* input possui estilização de erro caso o usuário tente enviar um formulário sem um dos campos preenchidos */}
                        <span>{grupo}</span>
                    </span>
                </div>
                {/* linha especial somente para os botões, podendo ser usado para todos os popups */}
                <div className={styles['linha-submit']}>
                    {/* botão não tem onclick, pois o submit já faz toda a ação de enviar o formulário. a função chamada está no onsubmit, no começo da tag form */}
                    <BotaoPreenchido
                    handleClick={() => {
                        setPopupExcluir(true);
                    }}
                    className={styles.botao}>
                        Excluir
                    </BotaoPreenchido>                  
                    <BotaoPreenchido
                    handleClick={() => {
                        setPopupEditar(true);
                    }}
                    className={styles.botao}>
                        Editar
                    </BotaoPreenchido>                  
                </div>
            </div>
            <EditarUsuario aberto={popupEditar} onClose={() => setPopupEditar(false)} />
            <ConfirmarExclusaoUsuario aberto={popupExcluir} onClose={() => setPopupExcluir(false)} />
        </PopUp>
    )
}