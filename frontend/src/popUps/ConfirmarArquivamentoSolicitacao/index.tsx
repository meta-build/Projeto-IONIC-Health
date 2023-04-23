import { useState } from "react";
import PopUp from "../../components/PopUp";
import BotaoPreenchido from "../../components/Botoes/BotaoPreenchido";
import styles from './ConfirmarArquivamentoSolicitacao.module.scss';
import classNames from "classnames";

interface Props {
    aberto: boolean;
    onClose: () => void;
}

export default function ConfirmarArquivamentoSolicitacao (props: Props) {
    const [tipo, setTipo] = useState('Feature');
    const [nome, setNome] = useState('exemplo')

    return(
        <PopUp
        visivel={props.aberto}
        onClose={props.onClose}
        titulo={`Arquivar a ${tipo} ${nome}?`}>
            <div className={styles.botoes}>
                <BotaoPreenchido
                handleClick={props.onClose}
                className={styles.botao}>
                    NÃO
                </BotaoPreenchido>
                <BotaoPreenchido className={classNames({
                    [styles.botao]: true
                })}>
                    SIM
                </BotaoPreenchido>
            </div>
        </PopUp>
    )
}