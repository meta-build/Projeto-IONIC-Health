import classNames from "classnames";
import { InputPopup } from "../../components/Inputs";
import PopUp from "../../components/PopUp";
import styles from './EditarConta.module.scss';
import { useState } from "react";
import { BotaoPopup } from "../../components/Botoes";

interface Props {
    aberto: boolean;
    onClose: () => void;
}

export default function EditarConta (props: Props) {
    // pegar valor de cada campo
    const [nomeAntigo, setNomeAntigo] = useState('Fulano');
    const [email, setEmail] = useState('fulano@email');
    const [senha, setSenha] = useState('123123');
    
    // se true > destacar campo em vermelho
    const [erroNome, setErroNome] = useState(false);
    const [erroGrupo, setErroGrupo] = useState(false);
    const [erroEmail, setErroEmail] = useState(false);
    const [erroSenha, setErroSenha] = useState(false);

    // função chamada ao clicar em "enviar" ou apertar enter (submeter formulário)
    const submit = () => {
        const obj: any = {};
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
        titulo={`Editar conta`}
        visivel={props.aberto}
        onClose={props.onClose}>
            <form
            className={styles.form}
            // ao clicar em criar ou dar enter, é submetido o formulário executando a função abaixo
            onSubmit={(e) => {
                e.preventDefault();
                submit();
            }}>
                <div className={styles.linha}>
                    <span className={classNames({
                        [styles.campo]: true,
                        [styles['campo-preenchido']]: true,
                    })}>
                        <label>Email:</label>
                        <InputPopup
                        className={classNames({
                            [styles['input-preenchido']]: true,
                            [styles.erro]: erroEmail
                        })}
                        handleChange={(s) => setEmail(s.target.value)}
                        onFocus={() => setErroEmail(false)}
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
                            [styles['input-preenchido']]: true,
                            [styles.erro]: erroSenha
                        })}
                        handleChange={(s) => setSenha(s.target.value)}
                        onFocus={() => setErroSenha(false)}
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