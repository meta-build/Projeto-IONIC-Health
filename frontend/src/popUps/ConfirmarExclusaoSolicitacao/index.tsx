import { useEffect, useState } from "react";
import PopUp from "../../components/PopUp";
import { BotaoPreenchido } from "../../components/Botoes";
import styles from './ConfirmarExclusaoSolicitacao.module.scss';
import classNames from "classnames";
import Solicitacoes from "../../services/Solicitacoes";
import { SolicitacaoProps } from "../../types";

interface Props {
  aberto: boolean;
  onClose: () => void;
  idSolic: number;
  onConfirm?: () => void;
}

export default function ConfirmarExclusaoSolicitacao(props: Props) {
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
      titulo={`Alerta EXCLUSÃO de ${solicitacao.tipo}`}>
      <span className={styles.aviso}>
        Após a exlusão, a ação não pode ser desfeita. Tem certeza em excluir a {solicitacao.tipo} {solicitacao.titulo}?
      </span>
      <div className={styles.botoes}>
        <BotaoPreenchido
          handleClick={() => {
            Solicitacoes.deletar(solicitacao.id).then(() => {
              props.onClose();
              if (props.onConfirm) props.onConfirm();
            })
          }}
          className={classNames({
            [styles.botao]: true,
            [styles.excluir]: true
          })}>
          EXCLUIR
        </BotaoPreenchido>
        <BotaoPreenchido
          handleClick={props.onClose}
          className={styles.botao}>
          CANCELAR
        </BotaoPreenchido>
      </div>
    </PopUp>
  );
}