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
    const [tituloAntigo, setTituloAntigo] = useState('exemplo');
    const [titulo, setTitulo] = useState(tituloAntigo);
    const [tipoAntigo, setTipoAntigo] = useState('Feature');
    const [tipo, setTipo] = useState(tipoAntigo);
    const [descricao, setDescricao] = useState('lorem ipsum');

    function enviar () {
        let obj: any = {};
        if (titulo !== '') {
            obj.titulo = titulo;
        }
        if (tipo !== '') {
            obj.tipo = tipo;
        }
        if (descricao !== '') {
            obj.descricao = descricao;
        }
        console.log(obj);
    }

    return(
        <PopUp
        titulo={`Editar ${tipoAntigo} ${tituloAntigo}`}
        visivel={props.aberto}
        onClose={props.onClose}
        >   
            <form
            className={styles.form}
            onSubmit={(e) => {
                e.preventDefault();
                enviar();
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
                        selecionadoFst={tipo}
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
                        valor={descricao}
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