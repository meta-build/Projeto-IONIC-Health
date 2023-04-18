import classNames from "classnames";
import {InputPopup} from "../../components/Inputs";
import PopUp from "../../components/PopUp";
import styles from './EditarSolicitacao.module.scss';
import {BotaoPopup} from "../../components/Botoes";
import { useEffect, useState } from "react";
import axios from "axios";

interface Props {
    id: number;
    aberto: boolean;
    onClose: () => void;
}

export default function EditarConta (props: Props) {

    let item = {
        "id": 2,
        "email": "fa@fatec.com",
        "senha": "123456",
        "verificaSolicitacao": true,
      }

      const [conta, setConta] = useState(item);
      const [email, setEmail] = useState(conta.email);
      const [senha, setSenha] = useState(conta.senha);
      const [aberto, setAberto] = useState(props.aberto);

      const concluir = () => {
        axios.put(`http://localhost:3001/update/${props.id}`,
        {
            "email": email,
            "senha": senha,
            "verificaSolicitacao": true,

          },
          {headers: {
            'Content-Type': 'application/json'
          }}
        ).then(() => {
            props.onClose();
            setAberto(false);
        })
      }

      useEffect(() => {
        axios.get(`http://localhost:3001/solicitacao/${props.id}`).then(r => {
            let mudarConta = r.data;
            setConta(mudarConta);
            setEmail(mudarConta['email']);
            setSenha(mudarConta['senha']);
        });
        setAberto(props.aberto);
      }, [props.aberto])

    return(
        <PopUp
        titulo={`Editar Conta ${conta.email} ${conta.senha}`}
        visivel={aberto}
        onClose={() => props.onClose()}
        >
            <div
            className={styles.form}
            >
                <div className={styles.inputs}>
                    <label
                    className={classNames({
                        [styles.input]: true,
                        [styles.preencher]: true
                    })}
                    >
                        <span className={styles.label}>Email</span>
                        <InputPopup
                        handleChange={(e) => setEmail(e.target.value)}
                        placeholder="Lorem-ipsum"
                        className={styles['input-preencher']}
                        valor={email}
                        />

                        <span className={styles.label}>Senha</span>
                        <InputPopup
                        handleChange={(e) => setSenha(e.target.value)}
                        placeholder="Lorem-ipsum"
                        className={styles['input-preencher']}
                        valor={senha}
                        />
                    </label>
                </div>  
                    <BotaoPopup
                    handleClick={() => concluir()}
                    tipo="submit"
                    className={styles.concluir}
                    >Criar</BotaoPopup>              
            </div>
        </PopUp>
    )
}