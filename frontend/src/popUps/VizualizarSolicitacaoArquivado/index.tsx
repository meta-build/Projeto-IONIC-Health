import { useState } from "react";
import PopUp from "../../components/PopUp";
import classNames from "classnames";
import styles from './VizualizarSolicitacaoArquivado.module.scss';
import BotaoPreenchido from "../../components/Botoes/BotaoPreenchido";
import AprovarParaProducao from "../AprovarParaProducao";
import ConfirmarExclusaoSolicitacao from "../ConfirmarExclusaoSolicitacao";

interface Props {
  aberto: boolean;
  onClose: () => void;
  usuario: 'soliciante' | 'adm';
}

export default function VizualizarSolicitacaoArquivado(props: Props) {
  const [titulo, setTitulo] = useState('exemplo');
  const [tipo, setTipo] = useState('Feature');
  const [desc, setDesc] = useState('lorem ipsum')

  const [popupExclusao, setPopupExclusao] = useState(false);
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
            <div className={styles.subtitulo}>
              <div>
                Criado em 01/01/2023 por Fulano de tal
              </div>
              <div>
                Editado em 01/01/2023 por Ciclano de tal
              </div>
              <div className={styles.arquivado}><b>
                Arquivado em 01/01/2023 por Ciclano de tal
              </b></div>
            </div>
            <div className={styles['linha-submit']}>
              {props.usuario == 'adm' && <>
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
      <ConfirmarExclusaoSolicitacao aberto={popupExclusao} onClose={() => setPopupExclusao(false)} />
      <AprovarParaProducao aberto={ppopupAprovar} onClose={() => setPopupAprovar(false)} />
    </PopUp>
  )
}