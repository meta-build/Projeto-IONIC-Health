import { useState } from "react";
import PopUp from "../../components/PopUp";
import BotaoPreenchido from "../../components/Botoes/BotaoPreenchido";
import styles from './AprovarParaProducao.module.scss';
import classNames from "classnames";

interface Props {
    aberto: boolean;
    onClose: () => void;
}

export default function AprovarParaProducao (props: Props) {
    const [tipo, setTipo] = useState('Feature');
    const [nome, setNome] = useState('exemplo')

    return(
        <PopUp
        visivel={props.aberto}
        onClose={props.onClose}
        titulo={`Liberação para produção`}>
            <span className={styles.aviso}>
                <div>
                    Liberar a {tipo} {nome} para producão?
                </div>
            </span>
            <div className={styles.botoes}>
                <BotaoPreenchido
                handleClick={props.onClose}
                className={styles.botao}>
                    CANCELAR
                </BotaoPreenchido>
                <BotaoPreenchido className={classNames({
                    [styles.botao]: true,
                    [styles.confirmar]: true
                })}>
                    CONFIRMAR
                </BotaoPreenchido>
            </div>
        </PopUp>
    )
}