import styles from './AlterarStatusProducao.module.scss';
import { useEffect, useState } from "react";
import PopUp from "../../components/PopUp";
import classNames from "classnames";
import { BotaoPreenchido } from "../../components/Botoes";
import { DropdownPreenchido } from "../../components/Dropdowns";
import Solicitacoes from "../../services/Solicitacoes";
import { SolicitacaoProps } from "../../types";

interface Props {
  aberto: boolean;
  onClose: () => void;
  idSolic: number;
  onChange?: (string) => void;
}

export default function AlterarStatusProducao(props: Props) {
  const [solicitacao, setSolicitacao] = useState({} as SolicitacaoProps);
  const [status, setStatus] = useState('');

  useEffect(() => {
    if (props.idSolic) {
      Solicitacoes.getByID(props.idSolic).then(data => {
        setSolicitacao(data);
        setStatus(data.status.split('.')[1]);
      });
    }
  }, [props.idSolic]);
  return (
    <PopUp
      titulo={`Alterar status de produção da ${solicitacao.tipo} ${solicitacao.titulo}`}
      visivel={props.aberto}
      onClose={props.onClose} >
      <form
        onSubmit={(e) => {
          e.preventDefault();
          Solicitacoes.atualizarProducao(solicitacao.id, status);
          props.onChange(status);
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
                  selecionadoFst={status}
                  handleSelected={(s) => setStatus(s)}
                />
              </span>
            </div>
            <div className={styles['linha-submit']}>
              <BotaoPreenchido
                className={styles.botao}
                handleClick={() => props.onClose()}>
                Cancelar
              </BotaoPreenchido>
              <BotaoPreenchido
                className={styles.botao}
                tipo="submit">
                Alterar
              </BotaoPreenchido>
            </div>
          </div>
        </div>
      </form>
    </PopUp>
  );
}