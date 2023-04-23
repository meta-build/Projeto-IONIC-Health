import { useState } from "react";
import PopUp from "../../components/PopUp";
import BotaoPreenchido from "../../components/Botoes/BotaoPreenchido";
import styles from './ConfirmarExclusaoSolicitacao.module.scss';
import classNames from "classnames";

interface Props {
    aberto: boolean;
    onClose: () => void;
}

export default function ConfirmarExclusaoSolicitacao (props: Props) {
    const [tipo, setTipo] = useState('Feature');
    const [nome, setNome] = useState('exemplo')

    return(
        <PopUp
        visivel={props.aberto}
        onClose={props.onClose}
        titulo={`Alerta EXCLUSÃO de ${tipo}`}>
            <span className={styles.aviso}>Após a exlusão, a ação não pode ser desfeita. Tem certeza em excluir a {tipo} {nome}?</span>
            <div className={styles.botoes}>
                <BotaoPreenchido className={classNames({
                    [styles.botao]: true,
                    [styles.excluir]: true
                })}>
                    EXCLUIR
                </BotaoPreenchido>
                <BotaoPreenchido
                handleClick={props.onClose}
                className={styles.botao}>
                    CANCELAR
                </BotaoPreenchido>
            </div>
        </PopUp>
    )
}