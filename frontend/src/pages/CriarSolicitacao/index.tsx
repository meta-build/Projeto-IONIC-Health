import styles from './CriarSolicitacao.module.scss';
import { Header36 } from '../../components/Header';
import { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Botao, BotaoPreenchido } from '../../components/Botoes';
import { faX } from '@fortawesome/free-solid-svg-icons';
import classNames from 'classnames';
import InputEscuro from '../../components/Inputs/InputEscuro';
import TextBoxEscuro from '../../components/Inputs/TextBoxEscuro';
import DropdownEscuro from '../../components/Dropdowns/DropdownEscuro';
import AnexarEscuro from '../../components/Botoes/AnexarEscuro';
import Solicitacoes from '../../services/Solicitacoes';
import { useContexto } from '../../context/contexto';
import PopupCarregando from '../../popUps/PopupCarregando';
import PopupConfirm from '../../popUps/PopupConfirm';
import { useNavigate, useParams } from 'react-router-dom';
import PopupErro from '../../popUps/PopupErro';
import { ArquivoProps } from '../../types';

export default function CriarSolicitacao() {
  const { usuario } = useContexto();
  const nav = useNavigate();

  const { id } = useParams();

  const [tipo, setTipo] = useState<string>('Feature');
  const [titulo, setTitulo] = useState('');
  const [descricao, setDescricao] = useState('');
  const [arquivos, setArquivos] = useState({ arquivos: [] });

  const [erro, setErro] = useState(false);
  const [erroTitulo, setErroTitulo] = useState(false);
  const [erroDesc, setErroDesc] = useState(false);

  const [carregando, setCarregando] = useState(false);
  const [sucesso, setSucesso] = useState(false);
  const [falha, setFalha] = useState(false);
  const [sucessoEdit, setSucessoEdit] = useState(false);
  const [falhaEdit, setFalhaEdit] = useState(false);

  const enviar = () => {
    if (!titulo || !descricao) {
      setErro(true);
      setErroTitulo(!titulo);
      setErroDesc(!descricao);
    } else {
      setCarregando(true);
      Solicitacoes.criar({
        arquivos: arquivos.arquivos,
        descricao,
        tipo: tipo,
        titulo: titulo
      }, usuario.token).then(() => {
        setCarregando(false);
        setSucesso(true);
      }).catch(() => {
        setCarregando(false);
        setFalha(true);
      });
    }
  }

  const editar = () => {
    if (!titulo || !descricao) {
      setErro(true);
      setErroTitulo(!titulo);
      setErroDesc(!descricao);
    } else {
      setCarregando(true);
      Solicitacoes.atualizar(Number(id), {
        descricao,
        tipo: tipo,
        titulo: titulo
      }).then(() => {
        setCarregando(false);
        setSucessoEdit(true);
      }).catch(() => {
        setCarregando(false);
        setFalhaEdit(true);
      });
    }
  }

  useEffect(() => {
    if (id) {
      Solicitacoes.getByID(Number(id)).then(data => {
        setTitulo(data.titulo);
        setTipo(data.tipo);
        setDescricao(data.descricao);
        setArquivos({ arquivos: data.attachments })
      });
    }
  }, []);
  return (
    <>
      <Header36
        className={styles.hd}>
        {id ? 'Editar' : 'Nova'} solicitação
      </Header36>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          if (id) {
            editar();
          } 
          else {
            enviar();
          }
        }}
        className={styles.form}>
        <div
          className={styles.ip}>
          <label
            className={classNames({
              [styles.lb]: true,
              [styles.preencher]: true,
            })}>
            Título
            <InputEscuro
              className={classNames({
                [styles.erro]: erroTitulo
              })}
              valor={titulo}
              onFocus={() => {
                setErroTitulo(false);
                setErro(false);
              }}
              handleChange={(e) => setTitulo(e.target.value)}
            />

          </label>
          <div className={styles.lb}>
            Tipo
            <DropdownEscuro
              itens={['Feature', 'Hotfix']}
              selecionadoFst={tipo}
              handleSelected={(s) => setTipo(s)}
            />
          </div>
        </div>
        <label className={styles.label}>
          Descrição
        </label>
        <TextBoxEscuro
          valor={descricao}
          ajustavel={false}
          className={classNames({
            [styles['descricao-input']]: true,
            [styles.erro]: erroDesc
          })}
          onFocus={() => {
            setErroDesc(false);
            setErro(false);
          }}
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
              {!id &&
                <AnexarEscuro
                  className={styles.arquivo}
                  handleFileChange={(e) => {
                    if (e) {
                      setArquivos((prevState) => {
                        return {
                          ...prevState,
                          arquivos: [...prevState.arquivos, e]
                        }
                      })
                    }
                  }}
                />}
            </label>
            <span className={styles.arquivos}>
              {!id && arquivos.arquivos.map((arquivo, index) =>
                <BotaoPreenchido
                  key={index}
                  className={classNames({
                    [styles.arquivo]: true,
                    [styles['arquivo-hover']]: true
                  })}
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
              {id && arquivos.arquivos.map((file: ArquivoProps) => (
                <BotaoPreenchido
                  key={file.id}
                  className={styles.arquivo}
                  handleClick={() => window.open(`http://localhost:3001${file.url}`, '_blank')}
                >
                  {file.fileName}
                </BotaoPreenchido>
              ))}
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
            <Botao
              handleClick={() => {
                nav(-1);
              }}
              className={classNames({
                [styles['bt-branco']]: true,
                [styles.bt]: true,
              })}>Cancelar</Botao>
            <Botao tipo='submit' className={styles.bt}>
              {id ? 'Editar' : 'Criar'}
            </Botao>
          </div>
        </div>
      </form>
      <PopupCarregando visivel={carregando} />
      {!id &&
        <>
          <PopupConfirm
            visivel={sucesso}
            onClose={() => {
              setSucesso(false);
              nav(-1);
            }}
            titulo='Sucesso'
            descricao='Solicitação criada com sucesso!'
          />
          <PopupErro
            visivel={falha}
            onClose={() => {
              setFalha(false);
            }}
            titulo='Erro ao criar solicitação'
            descricao='Não foi possível criar a solicitação por conta de um erro do servidor. Tente novamente mais tarde.'
          />
        </>
      }
      {id &&
        <>
          <PopupConfirm
            visivel={sucessoEdit}
            onClose={() => {
              setSucessoEdit(false);
              nav(-1);
            }}
            titulo='Sucesso'
            descricao='Solicitação editada com sucesso!'
          />
          <PopupErro
            visivel={falhaEdit}
            onClose={() => {
              setFalhaEdit(false);
            }}
            titulo='Erro ao editar solicitação'
            descricao='Não foi possível editar a solicitação por conta de um erro do servidor. Tente novamente mais tarde.'
          />
        </>
      }
    </>
  );
}