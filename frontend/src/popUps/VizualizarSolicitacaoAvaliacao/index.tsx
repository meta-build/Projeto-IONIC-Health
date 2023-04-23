import { useState } from "react";
import PopUp from "../../components/PopUp";
import classNames from "classnames";
import { BotaoNota } from "../../components/Botoes";
import styles from './VizualizarSolicitacaoAvaliacao.module.scss';
import BotaoPreenchido from "../../components/Botoes/BotaoPreenchido";
import AvaliarSolicitacao from "../AvaliarSolicitacao";

interface Props {
  aberto: boolean;
  onClose: () => void;
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

  const [popupAvaliar, setPopupAvaliar] =useState(false);

  const paletaCoresNota: ("cinza" | "verde" | "amarelo" | "vermelho" | "azul1" | "azul2")[] = [
    'cinza', 'verde', 'amarelo', 'vermelho'
  ]

  const paletaCoresNotaImpacto: ("cinza" | "verde" | "amarelo" | "vermelho" | "azul1" | "azul2")[] = [
    'cinza', 'verde', 'azul1', 'azul2'
  ]

  return (
    <PopUp
      titulo={`Feature XXXX`}
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
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque vestibulum libero mauris, a posuere lacus elementum quis. Vestibulum in lorem at nibh semper facilisis a ut augue. Praesent sed magna sed dui condimentum elementum. Donec nec tortor tincidunt urna bibendum semper. Duis sed malesuada ipsum. Nunc ullamcorper sodales libero, a varius metus facilisis sit amet. Praesent ac mi sit amet ligula commodo sollicitudin nec sit amet nibh. Aenean ultricies lorem et ex ullamcorper, vel volutpat odio semper. Praesent efficitur, nisi eu tristique lacinia, enim arcu vestibulum felis, at semper erat urna vitae orci. Duis imperdiet ante non ullamcorper laoreet. Integer luctus sed nisl quis fermentum. In ut nisl nec libero tristique maximus. Suspendisse sagittis nisl at velit laoreet suscipit.
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
                <BotaoPreenchido
                handleClick={() => setPopupAvaliar(true)}>
                  Avaliar
                </BotaoPreenchido>                  
              </div>
            </div>
          </div>
        </div>
      </div>
      <AvaliarSolicitacao aberto={popupAvaliar} onClose={() => setPopupAvaliar(false)} />
    </PopUp>
  )
}