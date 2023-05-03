import { useEffect, useState } from "react";
import PopUp from "../../components/PopUp";
import {BotaoPreenchido} from "../../components/Botoes";
import styles from './AprovarParaProducao.module.scss';
import classNames from "classnames";
import { SolicitacaoProps } from "../../types";
import Solicitacoes from "../../services/Solicitacoes";

interface Props {
  aberto: boolean;
  onClose: () => void;
  onConfirm: () => void;
  idSolic: number;
}

export default function AprovarParaProducao(props: Props) {
  const [solicitacao, setSolicitacao] = useState({} as SolicitacaoProps);

  useEffect(() => {
    if (props.idSolic) {
      Solicitacoes.getByID(props.idSolic).then(data => {
        setSolicitacao(data);
        console.log(data);
      });
    }
  }, [props.idSolic]);
  return (
    <PopUp
      visivel={props.aberto}
      onClose={props.onClose}
      titulo={`Liberação para produção`}>
      <span className={styles.aviso}>
        <div>
          Liberar a {solicitacao.tipo} {solicitacao.titulo} para producão?
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
            Solicitacoes.liberarParaProducao(solicitacao.id).then(() => {
              props.onConfirm();
              props.onClose();
            })
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