import { useState } from "react";
import PopUp from "../../components/PopUp";
import classNames from "classnames";
import styles from './VizualizarSolicitacaoProducao.module.scss';
import BotaoPreenchido from "../../components/Botoes/BotaoPreenchido";
import { AcaoProducao } from "../../components/ItemLista/Acoes";
import AlterarStatusProducao from "../AlterarStatusProducao";
import ConfirmarArquivamentoSolicitacao from "../ConfirmarArquivamentoSolicitacao";
import ConfirmarExclusaoSolicitacao from "../ConfirmarExclusaoSolicitacao";

interface Props {
  aberto: boolean;
  onClose: () => void;
  usuario: 'adm' | 'solicitante';
}

export default function VizualizarSolicitacaoProducao(props: Props) {
  const [titulo, setTitulo] = useState('exemplo');
  const [tipo, setTipo] = useState('Feature');
  const [status, setStatus] = useState<"new" | "on-holding" | "done">('on-holding');
  const [desc, setDesc] = useState('lorem ipsum');

  const [popupAlterar, setPopupAlterar] = useState(false);
  const [popupArquivar, setPopupArquivar] = useState(false);
  const [popupExclusao, setPopupExclusao] = useState(false);  

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
            </div>
            <div className={styles.producao}>
                <span className={styles.label}>Status de produção</span>
                <span className={styles['producao-status']}>
                    <AcaoProducao status={status} />
                </span>
            </div>
            <div className={styles['linha-submit']}>
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
                handleClick={() => setPopupAlterar(true)}>
                  Alterar status produção
                </BotaoPreenchido>
              </>}
            </div>
          </div>
        </div>
      </div>
      <AlterarStatusProducao aberto={popupAlterar} onClose={() => setPopupAlterar(false)} />
      <ConfirmarArquivamentoSolicitacao aberto={popupArquivar} onClose={() => setPopupArquivar(false)} />
      <ConfirmarExclusaoSolicitacao aberto={popupExclusao} onClose={() => setPopupExclusao(false)} />
    </PopUp>
  )
}