import { useEffect, useState } from "react";
import PopUp from "../../components/PopUp";
import { BotaoPreenchido } from "../../components/Botoes";
import styles from './ConfirmarArquivamentoSolicitacao.module.scss';
import classNames from "classnames";
import { SolicitacaoProps } from "../../types";
import Solicitacoes from "../../services/Solicitacoes";

interface Props {
  aberto: boolean;
  onClose: () => void;
  idSolic: number;
  onConfirm?: () => void;
}

export default function ConfirmarArquivamentoSolicitacao(props: Props) {
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
      titulo={`Arquivar a ${solicitacao.tipo} ${solicitacao.titulo}?`}>
      <div className={styles.botoes}>
        <BotaoPreenchido
          handleClick={props.onClose}
          className={styles.botao}>
          NÃO
        </BotaoPreenchido>
        <BotaoPreenchido
          handleClick={() => {
            Solicitacoes.arquivar(solicitacao.id)
              .then((data) => {
                props.onConfirm();
                props.onClose();
              })
          }}
          className={classNames({
            [styles.botao]: true
          })}>
          SIM
        </BotaoPreenchido>
      </div>
    </PopUp>
  )
}
