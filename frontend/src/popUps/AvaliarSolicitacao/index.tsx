import { useState } from "react";
import { BotaoNota, BotaoPopup } from "../../components/Botoes";
import PopUp from "../../components/PopUp";
import { TextBox } from "../../components/Inputs";
import styles from './AvaliarSolicitacao.module.scss';

interface Props {
    aberto: boolean;
    onClose: () => void;
}

export default function AvaliarSolicitacao(props: Props){
    const [nota, setNota] = useState<number>();
    const [comentario, setComentario] = useState('');

    return(
        <PopUp
        visivel={props.aberto}
        onClose={props.onClose}
        titulo="Avaliação de Risco da Feature tal">
            <span >info solicitação</span>
            <form
            className={styles.form}
            onSubmit={(e) => {
                e.preventDefault();
                console.log('foi');
            }}>
                <div className={styles.row}>
                    <label className={styles.item}>Nota:</label>
                    <BotaoNota
                    className={styles.item}
                    valor={0}
                    cor="cinza"
                    selecionado={nota == 0}
                    clicavel={true}
                    handleClick={() => setNota(0)} />
                    <BotaoNota
                    className={styles.item}
                    valor={1}
                    cor="verde"
                    selecionado={nota == 1}
                    clicavel={true}
                    handleClick={() => setNota(1)} />
                    <BotaoNota
                    className={styles.item}
                    valor={2}
                    cor="amarelo"
                    selecionado={nota == 2}
                    clicavel={true}
                    handleClick={() => setNota(2)} />
                    <BotaoNota
                    className={styles.item}
                    valor={3}
                    cor="vermelho"
                    selecionado={nota == 3}
                    clicavel={true}
                    handleClick={() => setNota(3)} />
                </div>
                <div className={styles['row-comentario']}>
                    <label>Comentário</label>
                    <TextBox
                    ajustavel={false}
                    className={styles['comentario-input']}
                    onChange={(e) => setComentario(e.target.value)}/>
                </div>
                <div className={styles['row-botao']}>
                    <BotaoPopup
                    tipo="submit">
                        Avaliar
                    </BotaoPopup>
                </div>
            </form>
        </PopUp>
    )
}