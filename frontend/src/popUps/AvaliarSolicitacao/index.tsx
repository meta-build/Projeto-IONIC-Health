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

    return (
        <PopUp
            visivel={props.aberto}
            onClose={props.onClose}
            titulo="Avaliação de Risco da Feature tal">
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
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque vestibulum libero mauris, a posuere lacus elementum quis. Vestibulum in lorem at nibh semper facilisis a ut augue. Praesent sed magna sed dui condimentum elementum. Donec nec tortor tincidunt urna bibendum semper. Duis sed malesuada ipsum. Nunc ullamcorper sodales libero, a varius metus facilisis sit amet. Praesent ac mi sit amet ligula commodo sollicitudin nec sit amet nibh. Aenean ultricies lorem et ex ullamcorper, vel volutpat odio semper. Praesent efficitur, nisi eu tristique lacinia, enim arcu vestibulum felis, at semper erat urna vitae orci. Duis imperdiet ante non ullamcorper laoreet. Integer luctus sed nisl quis fermentum. In ut nisl nec libero tristique maximus. Suspendisse sagittis nisl at velit laoreet suscipit.
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