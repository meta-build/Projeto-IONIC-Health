import styles from './ConfirmarExclusaoSolicitacao.module.scss';
import { useEffect, useState } from "react";
import PopUp from "../../components/PopUp";
import { BotaoPreenchido } from "../../components/Botoes";
import classNames from "classnames";
import Solicitacoes from "../../services/Solicitacoes";
import { SolicitacaoProps } from "../../types";

interface Props {
  aberto: boolean;
  onClose: () => void;
  idSolic: number;
  onConfirm?: () => void;
}

export default function AprovarParaAvaliacao(props: Props) {
  const [solicitacao, setSolicitacao] = useState({} as SolicitacaoProps);

  useEffect(() => {
    if (props.idSolic) {
      Solicitacoes.getByID(props.idSolic).then(data => {
        setSolicitacao(data);
      });
    }
  }, [props.idSolic]);
  return (
    <PopUp
      visivel={props.aberto}
      onClose={props.onClose}
      titulo={`Liberação para avaliação`}>
      <span className={styles.aviso}>
        <div>
          Liberar a {solicitacao.tipo} {solicitacao.titulo} para avaliação?
        </div>
        <div>
          Após confirmação, não será possível edita-lo
        </div>
      </span>
      <div className={styles.botoes}>
        <BotaoPreenchido
          handleClick={props.onClose}
          className={styles.botao}>
          CANCELAR
        </BotaoPreenchido>
        <BotaoPreenchido
          handleClick={() => {
            Solicitacoes.liberarParaAvaliacao(solicitacao.id);
            if (props.onConfirm) props.onConfirm();
            props.onClose();
          }}
          className={classNames({
            [styles.botao]: true,
            [styles.confirmar]: true
          })}>
          CONFIRMAR
        </BotaoPreenchido>
      </div>
    </PopUp>
  );
}