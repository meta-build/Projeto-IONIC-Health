import { useState } from "react";
import { InputPopup, TextBox } from "../../components/Inputs";
import PopUp from "../../components/PopUp";
import styles from './EditarSolicitacao.module.scss';
import classNames from "classnames";
import { DropdownPreenchido } from "../../components/Dropdowns";
import BotaoPreenchido from "../../components/Botoes/BotaoPreenchido";
import { BotaoPopup } from "../../components/Botoes";

interface Props {
    aberto: boolean;
    onClose: () => void;
}

export default function EditarSolicitacao (props: Props) {
    const [titulo, setTitulo] = useState('');
    const [tipo, setTipo] = useState('');
    const [descricao, setDescricao] = useState('');

    return(
        <PopUp
        titulo="Editar Feature tal"
        visivel={props.aberto}
        onClose={props.onClose}
        >   
            <form
            className={styles.form}
            onSubmit={(e) => {
                e.preventDefault();
            }}>
                <div className={styles.linha}>
                    <span className={classNames({
                        [styles.campo]: true,
                        [styles['campo-preenchido']]: true
                    })}>
                        <label className={styles.label}>
                            Título
                        </label>
                        <InputPopup
                        className={styles.input}
                        handleChange={(e) => setTitulo(e.target.value)}
                        valor={titulo} />
                    </span>
                    <span
                    className={styles.campo}>
                        <label className={styles.label}>
                            Tipo
                        </label>
                        <DropdownPreenchido
                        itens={['Feature', 'Hotfix']}
                        selecionadoFst=" "
                        handleSelected={(s) => setTipo(s)} />
                    </span>
                </div>
                <div className={styles.linha}>
                    <span className={classNames({
                        [styles.campo]: true,
                        [styles['campo-preenchido']]: true
                    })}>
                        <label className={styles.label}>
                            Descrição
                        </label>
                        <TextBox
                        ajustavel={false}
                        className={styles['descricao-input']}
                        onChange={(e) => setDescricao(e.target.value)}/>
                    </span>
                </div>
                <div className={styles.linha}>
                    <span className={classNames({
                        [styles.campo]: true,
                        [styles['campo-preenchido']]: true
                    })}>
                        <label className={styles.label}>
                            Arquivos
                        </label>
                        <span className={styles.arquivos}>
                            <BotaoPreenchido
                            className={styles.arquivo}
                            handleClick={() => console.log('foi')}>
                                arquivo.png
                            </BotaoPreenchido>
                        </span>
                    </span>
                </div>
                <div className={styles['linha-submit']}>
                    {/* botão não tem onclick, pois o submit já faz toda a ação de enviar o formulário. a função chamada está no onsubmit, no começo da tag form */}
                    <BotaoPopup tipo="submit">
                        Editar
                    </BotaoPopup>                  
                </div>
            </form>
        </PopUp>
    )
}