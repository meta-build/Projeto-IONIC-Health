import { useEffect, useState } from "react";
import PopUp from "../../components/PopUp";
import classNames from "classnames";
import styles from './VizualizarSolicitacao.module.scss';
import { BotaoPreenchido } from "../../components/Botoes";
import {
  ConfirmarExclusaoSolicitacao,
  AprovarParaAvaliacao,
  ConfirmarArquivamentoSolicitacao,
  EditarSolicitacao
} from '../';
import Solicitacoes from "../../services/Solicitacoes";
import { SolicitacaoProps } from "../../types";

interface Props {
  aberto: boolean;
  onClose: () => void;
  usuario: 'solicitante' | 'adm';
  idSolic: number;
}

export default function VizualizarSolicitacao(props: Props) {
  const [solicitacao, setSolicitacao] = useState({} as SolicitacaoProps);

  const [popupArquivar, setPopupArquivar] = useState(false);
  const [popupExclusao, setPopupExclusao] = useState(false);
  const [popupEditar, setPopupEditar] = useState(false);
  const [ppopupAprovar, setPopupAprovar] = useState(false);

  useEffect(() => {
    if (props.idSolic) {
      Solicitacoes.getByID(props.idSolic).then(data => {
        setSolicitacao(data);
      });
    }
  }, [props.idSolic, popupEditar]);
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
            })}
          >
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
                </div>}
            </div>
            <div className={styles['linha-submit']}>
              {props.usuario == 'adm' &&
                <>
                  <BotaoPreenchido
                    className={styles.botao}
                    handleClick={() => setPopupArquivar(true)}>
                    Arquivar
                  </BotaoPreenchido>
                  <BotaoPreenchido
                    className={styles.botao}
                    handleClick={() => setPopupExclusao(true)}>
                    Excluir
                  </BotaoPreenchido>
                  <BotaoPreenchido
                    className={styles.botao}
                    handleClick={() => setPopupEditar(true)}>
                    Editar
                  </BotaoPreenchido>
                  <BotaoPreenchido
                    className={styles.botao}
                    handleClick={() => setPopupAprovar(true)}>
                    Liberar para avaliação
                  </BotaoPreenchido>
                </>}
            </div>
          </div>
        </div>
      </div>
      <>
        <ConfirmarArquivamentoSolicitacao idSolic={solicitacao.id} aberto={popupArquivar} onClose={() => setPopupArquivar(false)} />
        <ConfirmarExclusaoSolicitacao
          idSolic={solicitacao.id}
          aberto={popupExclusao}
          onClose={() => setPopupExclusao(false)}
          onConfirm={() => props.onClose()} />
        <EditarSolicitacao idSolic={solicitacao.id} aberto={popupEditar} onClose={() => setPopupEditar(false)} />
        <AprovarParaAvaliacao
          idSolic={solicitacao.id}
          aberto={ppopupAprovar}
          onClose={() => setPopupAprovar(false)}
          onConfirm={() => props.onClose()} />
      </>
    </PopUp>
  )
}