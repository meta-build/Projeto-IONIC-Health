import { useState } from "react";
import PopUp from "../../components/PopUp";
import classNames from "classnames";
import styles from './AlterarStatusProducao.module.scss';
import BotaoPreenchido from "../../components/Botoes/BotaoPreenchido";
import { AcaoProducao } from "../../components/ItemLista/Acoes";
import { DropdownPreenchido } from "../../components/Dropdowns";

interface Props {
  aberto: boolean;
  onClose: () => void;
}

export default function AlterarStatusProducao(props: Props) {
  const [titulo, setTitulo] = useState('exemplo');
  const [tipo, setTipo] = useState('Feature');
  const [status, setStatus] = useState<"new" | "on-holding" | "done">('on-holding')
  
  return (
    <PopUp
      titulo={`Alterar status de produção da ${tipo} ${titulo}`}
      visivel={props.aberto}
      onClose={props.onClose} >

      <form
      onSubmit={(e) => {
        e.preventDefault();

        props.onClose();
      }}
      className={styles.form}>
        <div className={styles.inputs}>
          <div
            className={classNames({
              [styles.input]: true,
              [styles.preencher]: true
            })}
          >
            <div className={styles.producao}>
                <span className={styles.label}>Status de produção</span>
                <span className={styles['producao-status']}>
                    <label>Status:</label>
                    <DropdownPreenchido
                    itens={['New', 'On Holding', 'Done']}
                    handleSelected={(s) => console.log(s)} />  
                </span>
            </div>
            <div className={styles['linha-submit']}>
              <BotaoPreenchido tipo="submit">
                Alterar
              </BotaoPreenchido>
            </div>
          </div>
        </div>
      </form>
    </PopUp>
  )
}