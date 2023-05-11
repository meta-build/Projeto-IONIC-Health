import styles from './CriarSolicitacao.module.scss';
import { Header36 } from '../../components/Header';
import { DropdownPreenchido } from '../../components/Dropdowns';
import { useState } from 'react';
import { InputPopup, TextBox } from '../../components/Inputs';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Anexar, Botao, BotaoPopup, BotaoPreenchido } from '../../components/Botoes';
import { faX } from '@fortawesome/free-solid-svg-icons';
import classNames from 'classnames';



export default function CriarSolicitacao() {
  const [tipo, setTipo] = useState<string>('Feature');
  const [titulo, setTitulo] = useState('');
  const [descricao, setDescricao] = useState('');
  const [arquivos, setArquivos] = useState({ arquivos: [] });

  const [erro, setErro] = useState(false);



  return (
    <>
      <Header36
        className={styles.hd}>
        Nova Solicitação
      </Header36>
      <form
        className={styles.form}>
        <div
          className={styles.ip}>
          <label
            className={classNames({
              [styles.lb]: true,
              [styles.preencher]: true,
            })}>
            Título
            <InputPopup
              valor={titulo}
              handleChange={(e) => setTitulo(e.target.value)}
            />

          </label>
          <div className={styles.lb}>
            Tipo
            <DropdownPreenchido itens={['Feature', 'Hotfix']}
              selecionadoFst={tipo}
              handleSelected={(s) => setTipo(s)}
            />
          </div>
        </div>
        <label className={styles.label}>
          Descrição
        </label>
        <TextBox
          valor={descricao}
          ajustavel={false}
          className={styles['descricao-input']}
          onChange={(e) => setDescricao(e.target.value)}
        />
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
          <div
            className={styles.botoes}>
            <Botao tipo='submit' className={classNames({
              [styles['bt-branco']]: true,
              [styles.bt]: true,
            })}>Cancelar</Botao>
            <Botao tipo='submit' className={styles.bt}>Criar</Botao>
          </div>
        </div>
      </form>
    </>
  );
}