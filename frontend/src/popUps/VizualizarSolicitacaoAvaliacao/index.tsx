import { useState } from "react";
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

interface Props {
  aberto: boolean;
  onClose: () => void;
  usuario: 'solicitante' | 'adm' | 'avaliador';
}

interface AvaliacaoProps {
  comite: string,
  nota: number,
  comentario: string,
  avaliador: string
}

export default function VisualizarSolicitacaoAvaliacao(props: Props) {
  const [avs, setAvs] = useState<(AvaliacaoProps)[]>([
    { comite: 'Risco', nota: 3, comentario: 'abc', avaliador: '1' },
    { comite: 'Custo', nota: 2, comentario: 'def', avaliador: '2' },
    { comite: 'Impacto', nota: 3, comentario: 'ghi', avaliador: '3' }
  ])
  const [avSelecionado, setAvSelecionado] = useState<AvaliacaoProps>(avs[0]);

  const [tipo, setTipo] = useState('Hotfix');
  const [titulo, setTitulo] = useState('Exemplo');
  const [desc, setDesc] = useState('lorem ipsum');

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

  return (
    <PopUp
      titulo={`${tipo} ${titulo}`}
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
              {desc}
            </span>

            <span className={styles.label}>Arquivos</span>

            <span className={styles.arquivos}>
              <BotaoPreenchido
                className={styles.arquivo}
                handleClick={() => console.log('foi')}>
                arquivo.png
              </BotaoPreenchido>
            </span>

            <span className={styles['avaliacao-titulo']}>Avaliações</span>

            <div className={styles.avs}>
              {avs.map(av => (
                <BotaoPreenchido
                  corBotao={avSelecionado.comite == av.comite ? 'noturno' : 'claro'}
                  className={styles.av}
                  handleClick={() => setAvSelecionado(av)}>
                  {av.comite}
                </BotaoPreenchido>
              ))}
            </div>
            <div className={styles['av-completa']}>
              <div className={styles.nota}>
                <span className={styles.label}>Nota:</span>
                <BotaoNota
                  clicavel={false}
                  selecionado={true}
                  cor={
                    avSelecionado.comite == 'Impacto' ?
                      paletaCoresNotaImpacto[avSelecionado.nota] :
                      paletaCoresNota[avSelecionado.nota]}
                  valor={avSelecionado.nota} />
              </div>
              <div className={styles.nota}>
                <span className={styles.label}>Avaliador: <b>{avSelecionado.avaliador}</b></span>
              </div>
              <div className={styles.comentario}>
                <span className={styles.label}>Comentário</span>

                <span className={styles.conteudo}>
                  {avSelecionado.comentario}
                </span>
              </div>
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
      <ConfirmarArquivamentoSolicitacao aberto={popupArquivar} onClose={() => setPopupArquivar(false)} />
      <ConfirmarExclusaoSolicitacao aberto={popupExclusao} onClose={() => setPopupExclusao(false)} />
      <AprovarParaProducao aberto={ppopupAprovar} onClose={() => setPopupAprovar(false)} />
    </PopUp>
  )
}