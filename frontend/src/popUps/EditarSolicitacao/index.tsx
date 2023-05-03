import { useEffect, useState } from "react";
import { InputPopup, TextBox } from "../../components/Inputs";
import PopUp from "../../components/PopUp";
import styles from './EditarSolicitacao.module.scss';
import classNames from "classnames";
import { DropdownPreenchido } from "../../components/Dropdowns";
import { BotaoPopup, BotaoPreenchido } from "../../components/Botoes";
import Solicitacoes from "../../services/Solicitacoes";
import { EditarSolicitacaoProps, SolicitacaoProps } from "../../types";

interface Props {
  aberto: boolean;
  onClose: () => void;
  idSolic: number;
}

export default function EditarSolicitacao(props: Props) {
  const [solicitacao, setSolicitacao] = useState({} as SolicitacaoProps);

  const [titulo, setTitulo] = useState<string>();
  const [tipo, setTipo] = useState<string>();
  const [descricao, setDescricao] = useState<string>();

  function enviar() {
    let obj: EditarSolicitacaoProps = { tipo };
    if (titulo !== '') {
      obj.titulo = titulo;
    }
    if (descricao !== '') {
      obj.descricao = descricao;
    }
    Solicitacoes.atualizar(solicitacao.id, obj).then(() => {
      props.onClose();
    });
  }

  useEffect(() => {
    if (props.idSolic) {
      Solicitacoes.getByID(props.idSolic).then(data => {
        setSolicitacao(data);
        setTitulo(data.titulo);
        setTipo(data.tipo);
        setDescricao(data.descricao);
      });
    }
  }, [props.idSolic]);
  return (
    <PopUp
      titulo={`Editar ${solicitacao.tipo} ${solicitacao.titulo}`}
      visivel={props.aberto}
      onClose={props.onClose}
    >
      <form
        className={styles.form}
        onSubmit={(e) => {
          e.preventDefault();
          enviar();
        }}>
        <div className={styles.linha}>
          <span className={classNames({
            [styles.campo]: true,
            [styles['campo-preenchido']]: true
          })}>
            <label className={styles.label}>
              Título
            </label>
            <InputPopup
              className={styles.input}
              handleChange={(e) => setTitulo(e.target.value)}
              valor={titulo}
            />
          </span>
          <span
            className={styles.campo}>
            <label className={styles.label}>
              Tipo
            </label>
            <DropdownPreenchido
              itens={['Feature', 'Hotfix']}
              selecionadoFst={tipo}
              handleSelected={(s) => setTipo(s)}
            />
          </span>
        </div>
        <div className={styles.linha}>
          <span className={classNames({
            [styles.campo]: true,
            [styles['campo-preenchido']]: true
          })}>
            <label className={styles.label}>
              Descrição
            </label>
            <TextBox
              valor={descricao}
              ajustavel={false}
              className={styles['descricao-input']}
              onChange={(e) => setDescricao(e.target.value)}
            />
          </span>
        </div>
        <div className={styles.linha}>
          <span className={classNames({
            [styles.campo]: true,
            [styles['campo-preenchido']]: true
          })}>
            <label className={styles.label}>
              Arquivos
            </label>
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
          </span>
        </div>
        <div className={styles['linha-submit']}>
          {/* botão não tem onclick, pois o submit já faz toda a ação de enviar o formulário. a função chamada está no onsubmit, no começo da tag form */}
          <BotaoPopup tipo="submit">
            Editar
          </BotaoPopup>
        </div>
      </form>
    </PopUp>
  )
}