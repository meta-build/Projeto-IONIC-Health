import { useEffect, useState } from "react";
import PopUp from "../../components/PopUp";
import classNames from "classnames";
import styles from './VizualizarSolicitacaoArquivado.module.scss';
import { BotaoPreenchido } from "../../components/Botoes";
import {
  AprovarParaProducao,
  ConfirmarExclusaoSolicitacao
} from '../';
import Solicitacoes from "../../services/Solicitacoes";
import { SolicitacaoProps } from "../../types";

interface Props {
  aberto: boolean;
  onClose: () => void;
  usuario: 'solicitante' | 'adm';
  idSolic: number;
}

export default function VizualizarSolicitacaoArquivado(props: Props) {
  const [popupExclusao, setPopupExclusao] = useState(false);
  const [ppopupAprovar, setPopupAprovar] = useState(false);

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
      titulo={`${solicitacao.tipo} ${solicitacao.titulo}`}
      visivel={props.aberto}
      onClose={props.onClose} >
      <div className={styles.form}>
        <div className={styles.inputs}>
          <div
            className={classNames({
              [styles.input]: true,
              [styles.preencher]: true
            })}>
            <span className={styles.label}>
              Descrição
            </span>
            <span className={styles.conteudo}>
              {solicitacao.descricao}
            </span>
            <span className={styles.label}>
              Arquivos
            </span>
            <span className={styles.arquivos}>
              {solicitacao.attachments &&
                solicitacao.attachments.map(arquivo => (
                  <BotaoPreenchido
                    key={arquivo.id}
                    className={styles.arquivo}
                    handleClick={() => window.open(`http://localhost:3001${arquivo.url}`, '_blank')}>
                    {arquivo.fileName}
                  </BotaoPreenchido>
                ))}
            </span>
            <div className={styles.subtitulo}>
              <div>
                Criado em {new Date(solicitacao.data_criacao).toLocaleDateString('pt-br', {
                  day: "2-digit",
                  month: "2-digit",
                  year: "numeric",
                  hour: "numeric",
                  minute: "numeric",
                  hour12: false
                })}
              </div>
              {solicitacao.data_edicao &&
                <div>
                  Editado em {new Date(solicitacao.data_edicao).toLocaleDateString('pt-br', {
                    day: "2-digit",
                    month: "2-digit",
                    year: "numeric",
                    hour: "numeric",
                    minute: "numeric",
                    hour12: false
                  })}
                </div>
              }
              <div className={styles.arquivado}>
                <b>
                  Arquivado em {new Date(solicitacao.data_arquivado).toLocaleDateString('pt-br', {
                    day: "2-digit",
                    month: "2-digit",
                    year: "numeric",
                    hour: "numeric",
                    minute: "numeric",
                    hour12: false
                  })}
                </b>
              </div>
            </div>
            <div className={styles['linha-submit']}>
              {props.usuario == 'adm' &&
                <>
                  <BotaoPreenchido
                    className={styles.botao}
                    handleClick={() => setPopupExclusao(true)}>
                    Excluir
                  </BotaoPreenchido>
                  <BotaoPreenchido
                    className={styles.botao}
                    handleClick={() => setPopupAprovar(true)}>
                    Aprovar para produção
                  </BotaoPreenchido>
                </>
              }
            </div>
          </div>
        </div>
      </div>
      <ConfirmarExclusaoSolicitacao
        onConfirm={() => props.onClose()}
        idSolic={solicitacao.id}
        aberto={popupExclusao}
        onClose={() => setPopupExclusao(false)}
      />
      <AprovarParaProducao
        onConfirm={() => props.onClose()}
        idSolic={solicitacao.id}
        aberto={ppopupAprovar}
        onClose={() => setPopupAprovar(false)}
      />
    </PopUp>
  )
}