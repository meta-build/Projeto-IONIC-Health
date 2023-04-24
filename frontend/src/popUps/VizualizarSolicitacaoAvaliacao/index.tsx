import { useEffect, useState } from "react";
import PopUp from "../../components/PopUp";
import classNames from "classnames";
import { BotaoNota } from "../../components/Botoes";
import styles from './VizualizarSolicitacaoAvaliacao.module.scss';
import BotaoPreenchido from "../../components/Botoes/BotaoPreenchido";
import AvaliarSolicitacao from "../AvaliarSolicitacao";
import AprovarParaAvaliacao from "../AprovarParaAvaliacao";
import ConfirmarArquivamentoSolicitacao from "../ConfirmarArquivamentoSolicitacao";
import ConfirmarExclusaoSolicitacao from "../ConfirmarExclusaoSolicitacao";
import AprovarParaProducao from "../AprovarParaProducao";
import { RatingProps, SolicitacaoProps } from "../../types";
import Solicitacoes from "../../services/Solicitacoes";

interface Props {
  aberto: boolean;
  onClose: () => void;
  usuario: 'solicitante' | 'adm' | 'avaliador';
  idSolic: number;
}

export default function VisualizarSolicitacaoAvaliacao(props: Props) {
  const [solicitacao, setSolicitacao] = useState({} as SolicitacaoProps);

  const [avs, setAvs] = useState<(RatingProps)[]>([])
  const [avSelecionado, setAvSelecionado] = useState<RatingProps>();

  const [popupAvaliar, setPopupAvaliar] =useState(false);
  const [popupArquivar, setPopupArquivar] = useState(false);
  const [popupExclusao, setPopupExclusao] = useState(false);
  const [ppopupAprovar, setPopupAprovar] = useState(false);

  const paletaCoresNota: ("cinza" | "verde" | "amarelo" | "vermelho" | "azul1" | "azul2")[] = [
    'cinza', 'verde', 'amarelo', 'vermelho'
  ]

  const paletaCoresNotaImpacto: ("cinza" | "verde" | "amarelo" | "vermelho" | "azul1" | "azul2")[] = [
    'cinza', 'verde', 'azul1', 'azul2'
  ]

  useEffect(() => {
    if (props.idSolic) {
      Solicitacoes.getByID(props.idSolic).then(data => {
        setSolicitacao(data);
        setAvSelecionado(data.ratings[0]);
        console.log(data);
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
            })}
          >
            <span className={styles.label}>Descrição</span>

            <span className={styles.conteudo}>
              {solicitacao.descricao}
            </span>

            <span className={styles.label}>Arquivos</span>
            <span className={styles.arquivos}>
              {solicitacao.attachments && solicitacao.attachments.map(arquivo => (
                <BotaoPreenchido
                  key={arquivo.id}
                  className={styles.arquivo}
                  handleClick={() => window.open(`http://localhost:3001${arquivo.url}`, '_blank')}>
                  {arquivo.fileName}
                </BotaoPreenchido>
              ))}
            </span>

            <span className={styles['avaliacao-titulo']}>Avaliações</span>

            <div className={styles.avs}>
              {Boolean(solicitacao.ratings) && solicitacao.ratings.length ? solicitacao.ratings.map(av => (
                <BotaoPreenchido
                  corBotao={avSelecionado.committee == av.committee ? 'noturno' : 'claro'}
                  className={styles.av}
                  handleClick={() => setAvSelecionado(av)}>
                  {av.committee}
                </BotaoPreenchido>
                )) :
                <span className={styles.label}>Sem avaliações</span>
              }
            </div>
            <div className={styles['av-completa']}>
              {avSelecionado && <>
                <div className={styles.nota}>
                  <span className={styles.label}>Nota:</span>
                  <BotaoNota
                    clicavel={false}
                    selecionado={true}
                    cor={
                      avSelecionado.committee == 'Impacto' ?
                        paletaCoresNotaImpacto[avSelecionado.value] :
                        paletaCoresNota[avSelecionado.value]}
                    valor={avSelecionado.value} />
                </div>
                <div className={styles.nota}>
                  {/* <span className={styles.label}>Avaliador: <b>{avSelecionado.avaliador}</b></span> */}
                </div>
                <div className={styles.comentario}>
                  <span className={styles.label}>Comentário</span>

                  <span className={styles.conteudo}>
                    {avSelecionado.comment}
                  </span>
                </div>
              </>}
              <div className={styles['linha-submit']}>
                {/* verificar usuário e exibir os botões corretos */}
                {props.usuario == 'avaliador' && 
                <BotaoPreenchido
                className={styles.botao}
                handleClick={() => setPopupAvaliar(true)}>
                  Avaliar
                </BotaoPreenchido> }
                {props.usuario == 'adm' && <>
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
                  handleClick={() => setPopupAprovar(true)}>
                    Aprovar para produção
                  </BotaoPreenchido>
                </>}                
              </div>
            </div>
          </div>
        </div>
      </div>
      <AvaliarSolicitacao aberto={popupAvaliar} onClose={() => setPopupAvaliar(false)} />
      <ConfirmarArquivamentoSolicitacao idSolic={solicitacao.id} aberto={popupArquivar} onClose={() => setPopupArquivar(false)} />
      <ConfirmarExclusaoSolicitacao idSolic={solicitacao.id} aberto={popupExclusao} onClose={() => setPopupExclusao(false)} />
      <AprovarParaProducao onConfirm={() => props.onClose()} idSolic={solicitacao.id} aberto={ppopupAprovar} onClose={() => setPopupAprovar(false)} />
    </PopUp>
  )
}