import classNames from "classnames";
import DropdownPopup from "../../components/DropdownPopup";
import InputPopup from "../../components/InputPopup";
import PopUp from "../../components/PopUp";
import styles from './EditarSolicitacao.module.scss';
import BotaoPopup from "../../components/BotaoPopup";
import { useEffect, useState } from "react";
import axios from "axios";

interface Props {
    id: number;
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

    const [titulo, setTitulo] = useState(item.nomeSolicitacao)
    const [tipo, setTipo] = useState(item.tipoSolicitacao)
    const [solicitacao, setSolicitacao] = useState(item)

    return(
        <PopUp
        titulo={`Editar ${item.tipoSolicitacao} ${item.nomeSolicitacao}`}
        visivel={true}
        onClose={() => console.log('foi')}
        >
            <form
            className={styles.form}
            onSubmit={(e) => {
                e.preventDefault()
                console.log(e)
            }}>
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
                        <DropdownPopup
                        itens={['Feature', 'Hotfix']}
                        handleSelected={(e) => setTipo(e)}
                        selecionado={item.tipoSolicitacao}
                        />
                    </label>
                </div>
                <div className={styles['botao-line']}>
                    <BotaoPopup
                    handleClick={() => console.log('foi')}
                    tipo="submit"
                    >Editar</BotaoPopup>
                </div>
            </form>
        </PopUp>
    )
}