import { useState } from "react";
import { InputPopup, TextBox } from "../../components/Inputs";
import PopUp from "../../components/PopUp";
import styles from './CriarSolicitacao.module.scss';
import classNames from "classnames";
import { DropdownPreenchido } from "../../components/Dropdowns";
import { 
  Anexar, 
  BotaoPopup, 
  BotaoPreenchido 
} from "../../components/Botoes";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faX } from "@fortawesome/free-solid-svg-icons";
import Solicitacoes from "../../services/Solicitacoes";
import { useContexto } from "../../context/contexto";

interface Props {
  aberto: boolean;
  onClose: () => void;
}

export default function CriarSolicitacao(props: Props) {
  const [titulo, setTitulo] = useState<string>();
  const [tipo, setTipo] = useState<string>('Feature');
  const [descricao, setDescricao] = useState<string>();
  const [arquivos, setArquivos] = useState({ arquivos: [] });

  const [erro, setErro] = useState(false);

  const { usuario } = useContexto();

  function enviar() {
    if (titulo && tipo && descricao && arquivos.arquivos.length) {
      Solicitacoes.criar({
        arquivos: arquivos.arquivos,
        descricao,
        tipo: tipo,
        titulo: titulo
      }, usuario.token).then(() => props.onClose());
    } else {
      setErro(true);
    }
  }
  return (
    <PopUp
      titulo={`Criar solicitação`}
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
            <label className={styles['label-arquivo']}>
              <span className={styles['arquivo-label']}>
                Arquivos
              </span>
              <Anexar
                className={styles.arquivo}
                handleFileChange={(e) => {
                  setArquivos((prevState) => {
                    return {
                      ...prevState,
                      arquivos: [...prevState.arquivos, e]
                    }
                  })
                }}
              />
            </label>
            <span className={styles.arquivos}>
              {arquivos.arquivos.map((arquivo, index) =>
                <BotaoPreenchido
                  key={index}
                  className={styles.arquivo}
                  handleClick={() => {
                    setArquivos((prevState) => {
                      return {
                        ...prevState,
                        arquivos: prevState.arquivos.filter(f => f !== arquivo)
                      }
                    });
                  }}>
                  {arquivo.name}
                  <FontAwesomeIcon
                    icon={faX}
                    className={styles['close-file-icon']}
                  />
                </BotaoPreenchido>)}
            </span>
          </span>
        </div>
        <div className={styles['linha-submit']}>
          {/* botão não tem onclick, pois o submit já faz toda a ação de enviar o formulário. a função chamada está no onsubmit, no começo da tag form */}
          {erro &&
            <span
              style={{
                color: 'red',
                marginRight: '12px'
              }}>
              Campos incompletos
            </span>}
          <BotaoPopup tipo="submit">
            Criar
          </BotaoPopup>
        </div>
      </form>
    </PopUp>
  )
}