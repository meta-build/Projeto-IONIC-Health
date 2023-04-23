import classNames from "classnames";
import { InputPopup } from "../../components/Inputs";
import PopUp from "../../components/PopUp";
import styles from './EditarUsuario.module.scss';
import { useState } from "react";
import { DropdownPreenchido } from "../../components/Dropdowns";
import { BotaoPopup } from "../../components/Botoes";

interface Props {
    aberto: boolean;
    onClose: () => void;
}

export default function EditarUsuario (props: Props) {
    // pegar valor de cada campo
    const [nomeAntigo, setNomeAntigo] = useState('Fulano');
    const [nome, setNome] = useState(nomeAntigo);
    const [grupo, setGrupo] = useState('Solicitante');
    const [email, setEmail] = useState('fulano@email');
    const [senha, setSenha] = useState('123123');

    // função chamada ao clicar em "enviar" ou apertar enter (submeter formulário)
    const submit = () => {
        const obj: any = {
            grupo
        };

        if (nome !== '') {
            obj.nome = nome;
        }
        if (email !== '') {
            obj.email = email;
        }
        if (senha !== '') {
            obj.senha = senha;
        }

        console.log(obj);
    }

    return(
        <PopUp
        titulo={`Editar usuário ${nomeAntigo}`}
        visivel={props.aberto}
        onClose={props.onClose}>
            <form
            className={styles.form}
            // ao clicar em criar ou dar enter, é submetido o formulário executando a função abaixo
            onSubmit={(e) => {
                e.preventDefault();
                submit();
            }}>
                {/* cada linha é feito com div, observar estilização aplicada */}
                <div className={styles.linha}>
                    {/* cada campo é feito com span, onde dentro tem label e o input */}
                    <span className={classNames({
                        [styles.campo]: true,
                        [styles['campo-preenchido']]: true
                    })}>
                        <label>Nome:</label>

                        {/* input possui estilização de erro caso o usuário tente enviar um formulário sem um dos campos preenchidos */}
                        <InputPopup
                        className={classNames({
                            [styles['input-preenchido']]: true
                        })}
                        handleChange={(s) => setNome(s.target.value)}
                        valor={nome}
                        />
                    </span>
                    <span
                    className={styles.campo}>
                        <label>Grupo:</label>
                        <DropdownPreenchido
                        itens={['Solicitante', 'Avaliador de Risco', 'Avaliador de Impacto', 'Avaliador de Custo', 'Administrador']}
                        selecionadoFst={grupo}
                        handleSelected={(s) => setGrupo(s)} />
                    </span>
                </div>
                <div className={styles.linha}>
                    <span className={classNames({
                        [styles.campo]: true,
                        [styles['campo-preenchido']]: true,
                    })}>
                        <label>Email:</label>
                        <InputPopup
                        className={classNames({
                            [styles['input-preenchido']]: true
                        })}
                        handleChange={(s) => setEmail(s.target.value)}
                        valor={email}
                        // o tipo email exige uma formatação específica para email como presença do @ e sem caracteres especiais ou acentos
                        tipo="email"
                        />
                    </span>
                    <span className={classNames({
                        [styles.campo]: true,
                        [styles['campo-preenchido']]: true
                    })}>
                        <label>Senha:</label>
                        <InputPopup
                        className={classNames({
                            [styles['input-preenchido']]: true
                        })}
                        handleChange={(s) => setSenha(s.target.value)}
                        valor={senha}
                        // tipo password censura o campo inserido
                        tipo="password"
                        />
                    </span>
                </div>
                {/* linha especial somente para os botões, podendo ser usado para todos os popups */}
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