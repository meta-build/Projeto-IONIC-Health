import { useState } from "react";
import { BotaoNota, BotaoPopup } from "../../components/Botoes";
import PopUp from "../../components/PopUp";
import { TextBox } from "../../components/Inputs";
import styles from './AvaliarSolicitacao.module.scss';
import BotaoPreenchido from "../../components/Botoes/BotaoPreenchido";
import classNames from "classnames";

interface Props {
    aberto: boolean;
    onClose: () => void;
}

export default function AvaliarSolicitacao(props: Props) {
    const [nota, setNota] = useState<number>();
    const [comentario, setComentario] = useState('');

    const [titulo, setTitulo] = useState('');
    const [tipo, setTipo] = useState('');
    const [desc, setDesc] = useState('');

    return (
        <PopUp
            visivel={props.aberto}
            onClose={props.onClose}
            titulo={`Avaliação da ${tipo} ${titulo}`}>
            <form
                className={styles.form}
                onSubmit={(e) => {
                    e.preventDefault();
                    console.log('foi');
                }}>
                <div className={styles.inputs}>
                    <div className={classNames({
                        [styles.input]: true,
                        [styles.preencher]: true
                    })}>
                        <span className={styles.label}>Descrição</span>
                        <span className={styles.conteudo}>
                            {desc}
                        </span>
                    <span className={styles.label}>Arquivos</span>
                    <span className={styles.arquivos}>
                        <BotaoPreenchido
                            className={styles.arquivo}
                            handleClick={() => console.log('foi')}>
                            arquivo.png
                        </BotaoPreenchido>
                    </span>
                    <div className={styles.subtitulo}>
                        <div>
                            Criado em 01/01/2023 por Fulano de tal
                        </div>
                        <div>
                            Editado em 01/01/2023 por Ciclano de tal
                        </div>
                    </div>
                    </div>
                </div>

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
                        onChange={(e) => setComentario(e.target.value)} />
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