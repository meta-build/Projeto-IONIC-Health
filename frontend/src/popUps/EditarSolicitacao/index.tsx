import classNames from "classnames";
import DropdownPopup from "../../components/DropdownPopup";
import InputPopup from "../../components/InputPopup";
import PopUp from "../../components/PopUp";
import styles from './EditarSolicitacao.module.scss';
import BotaoPopup from "../../components/Botoes/BotaoPopup";
import { useEffect, useState } from "react";
import axios from "axios";
import DropdownPopup2 from "../../components/DropdownPopupBase copy";
import DropdownPreenchido from "../../components/DropdownPreenchido";

interface Props {
    id: number;
    aberto: boolean;
    onClose: () => void;
}

export default function EditarSolicitacao (props: Props) {

    let item = {
        "id": 2,
        "nomeSolicitacao": "Solicitação x",
        "tipoSolicitacao": "Feature",
        "solicitante": "Polnareff",
        "verificaSolicitacao": true,
        "arquivar": null
      }

      const [solicitacao, setSolicitacao] = useState(item);
      const [titulo, setTitulo] = useState(solicitacao.nomeSolicitacao);
      const [tipo, setTipo] = useState(solicitacao.tipoSolicitacao);
      const [arquivar, setArquivar] = useState<boolean>(Boolean(solicitacao.arquivar));
      const [aberto, setAberto] = useState(props.aberto);

      const concluir = () => {
        axios.put(`http://localhost:3001/update/${props.id}`,
        {
            "nomeSolicitacao": titulo,
            "tipoSolicitaçao": tipo,
            "solicitante": "Polnareff",
            "verificaSolicitacao": true,
            "arquivar": arquivar
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
            let solicitacaoTemp = r.data;
            setSolicitacao(solicitacaoTemp);
            setTitulo(solicitacaoTemp['nomeSolicitacao']);
            setTipo(solicitacaoTemp['tipoSolicitacao']);
        });
        setAberto(props.aberto);
      }, [props.aberto])

    return(
        <PopUp
        titulo={`Editar ${solicitacao.tipoSolicitacao} ${solicitacao.nomeSolicitacao}`}
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
                    {/* <label
                    className={styles.input}
                    >
                        <span className={styles.label}>Arquivar</span>
                        <DropdownPreenchido
                        itens={['Arquivar', 'Desarquivar']}
                        handleSelected={(e) => {
                            setArquivar(e == 'Arquivar')
                        }}
                        selecionadoFst={tipo}
                        />
                    </label> */}
                </div>  
                    <BotaoPopup
                    handleClick={() => concluir()}
                    tipo="submit"
                    className={styles.concluir}
                    >Editar</BotaoPopup>
                
            </div>
        </PopUp>
    )
}