import { useState } from "react";
import PopUp from "../../components/PopUp";
import classNames from "classnames";
import styles from './VizualizarSolicitacao.module.scss';
import BotaoPreenchido from "../../components/Botoes/BotaoPreenchido";
import ConfirmarExclusaoSolicitacao from "../ConfirmarExclusaoSolicitacao";
import AprovarParaAvaliacao from "../AprovarParaAvaliacao";
import { BotaoPopup } from "../../components/Botoes";
import ConfirmarArquivamentoSolicitacao from "../ConfirmarArquivamentoSolicitacao";
import EditarSolicitacao from "../EditarSolicitacao";

interface Props {
  aberto: boolean;
  onClose: () => void;
  usuario: 'solicitante' | 'adm';
}

export default function VizualizarSolicitacao(props: Props) {
  const [titulo, setTitulo] = useState('exemplo');
  const [tipo, setTipo] = useState('Feature');

  const [popupArquivar, setPopupArquivar] = useState(false);
  const [popupExclusao, setPopupExclusao] = useState(false);
  const [popupEditar, setPopupEditar] = useState(false);
  const [ppopupAprovar, setPopupAprovar] = useState(false);
  
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
            <div className={styles.subtitulo}>
              <div>
                Criado em 01/01/2023 por Fulano de tal
              </div>
              <div>
                Editado em 01/01/2023 por Ciclano de tal
              </div>
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
      <ConfirmarArquivamentoSolicitacao aberto={popupArquivar} onClose={() => setPopupArquivar(false)} />
      <ConfirmarExclusaoSolicitacao aberto={popupExclusao} onClose={() => setPopupExclusao(false)} />
      <EditarSolicitacao aberto={popupEditar} onClose={() => setPopupEditar(false)} />
      <AprovarParaAvaliacao aberto={ppopupAprovar} onClose={() => setPopupAprovar(false)} />
    </PopUp>
  )
}