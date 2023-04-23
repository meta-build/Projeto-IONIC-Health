import classNames from "classnames";
import {InputPopup} from "../../components/Inputs";
import PopUp from "../../components/PopUp";
import styles from './CriarSolicitacao.module.scss';
import BotaoPopup from "../../components/Botoes/BotaoPopup";
import { useEffect, useState } from "react";
import axios from "axios";
import {DropdownPreenchido} from "../../components/Dropdowns";
import Anexar from "../../components/Botoes/Anexar";
import TextBox from "../../components/Inputs/TextBox";


interface Props {
    aberto: boolean;
    onClose: () => void;
}

export default function CriarSolicitacao (props: Props) {
      const [titulo, setTitulo] = useState('');
      const [tipo, setTipo] = useState('Feature');
      const [aberto, setAberto] = useState(props.aberto);

      const concluir = () => {
        axios.post(`http://localhost:3001/create`,
        {
            "nome": titulo,
            "tipo": tipo,
            "solicitante": "Polnareff",
            "verificaSolicitacao": true
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
        setAberto(props.aberto);
      }, [props.aberto])

    return(
        <PopUp
        titulo={`Nova solicitação`}
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
                        <span className={styles.label}>Título</span>
                        <InputPopup
                        handleChange={(e) => setTitulo(e.target.value)}
                        placeholder="Titulo da solicitação"
                        className={styles['input-preencher']}
                        valor={titulo}
                        />

                        <span className={styles.label}>Descrição</span>             
                        <TextBox 
                        placeholder="Descrição da solicitação"
                        onChange={(e) => console.log(e)}
                        />
                        
                        <span className={styles.label}>Arquivos</span>
                        <Anexar  handleClick={() => console.log('foi')}> Anexar Arquivo</Anexar>
                        
                    </label>

                    <label
                    className={styles.input}
                    >
                        <span className={styles.label}>Tipo</span>
                        <DropdownPreenchido
                        itens={['Feature', 'Hotfix']}
                        handleSelected={(e) => setTipo(e)}
                        selecionadoFst={tipo}
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