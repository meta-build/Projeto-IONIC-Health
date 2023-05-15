import styles from './ListaSolicitacoes.module.scss';
import { useEffect, useState } from 'react';
import GoogleIcon from '../../components/GoogleIcon';
import { Header32 } from '../../components/Header';
import { InputContornado } from '../../components/Inputs';
import { DropdownContornado } from '../../components/Dropdowns';
import Solicitacoes from '../../services/Solicitacoes';
import ItemSolicitacao from '../../components/ItemSolicitacao';
import { RatingProps, SolicitacaoProps } from '../../types';
import classNames from 'classnames';
import BadgeStatus from '../../components/BadgeStatus';
import { Botao, BotaoPreenchido } from '../../components/Botoes';
import { useContexto } from '../../context/contexto';
import { useNavigate } from 'react-router-dom';
import PopupAlerta from '../../popUps/PopupAlerta';
import PopupConfirm from '../../popUps/PopupConfirm';
import PopupCarregando from '../../popUps/PopupCarregando';
import PopupErro from '../../popUps/PopupErro';
import PopupAprovacao from '../../popUps/PopupAprovacao';

export default function ListaSolicitacoes() {
  const nav = useNavigate();
  const { usuario } = useContexto();

  const [busca, setBusca] = useState('');
  const [tipo, setTipo] = useState('Todos');
  const [status, setStatus] = useState(usuario.grupo >= 3 ? 'Em avaliação' : 'Todos');
  const [situacaoNota, setSituacaoNota] = useState('semNota')

  const [solicitacoes, setSolicitacoes] = useState([]);
  const [solicSelecionada, setSolicSelecionada] = useState<SolicitacaoProps>();

  const [carregando, setCarregando] = useState(false);

  const [confirmExcluir, setConfirmExcluir] = useState(false);
  const [confirmArquivar, setConfirmArquivar] = useState(false);
  const [confirmDesarquivar, setConfirmDesarquivar] = useState(false);
  const [confirmLiberarAv, setConfirmLiberarAv] = useState(false);
  const [confirmLiberarProd, setConfirmLiberarProd] = useState(false);

  const [sucessoExcluir, setSucessoExcluir] = useState(false);
  const [sucessoArquivar, setSucessoArquivar] = useState(false);
  const [sucessoDesarquivar, setSucessoDesarquivar] = useState(false);
  const [sucessoLiberarAv, setSucessoLiberarAv] = useState(false);
  const [sucessoLiberarProd, setSucessoLiberarProd] = useState(false);

  const [falhaExcluir, setFalhaExcluir] = useState(false);
  const [falhaArquivar, setFalhaArquivar] = useState(false);
  const [falhaDesarquivar, setFalhaDesarquivar] = useState(false);
  const [falhaLiberarAv, setFalhaLiberarAv] = useState(false);
  const [falhaLiberarProd, setFalhaLiberarProd] = useState(false);

  const filtrarNome = (titulo: string) => {
    const regex = new RegExp(busca, 'i');
    return regex.test(titulo);
  }

  const strAvaliador = (grupoId: number) => {
    switch (grupoId) {
      case 3:
        return 'Risco';
      case 4:
        return 'Custo';
      default:
        return 'Impacto';
    }
  }

  const isSemNota = (solic: SolicitacaoProps) => {
    const notas = solic.ratings
    let result = true;
    if (notas) {
      notas.forEach(nota => {
        if (nota.committee == strAvaliador(usuario.grupo)) {
          result = false;
        }
      });
    }
    return result;
  }

  const getSolicitacoes = () => {
    Solicitacoes.getAll()
      .then(data => {
        setSolicitacoes(data.filter((item: SolicitacaoProps) => {
          const filtroCriador = usuario.grupo == 2 ? item.id_user == usuario.id : true;
          const filtroAv = usuario.grupo >= 3 ?
            (situacaoNota == 'Todos' ? true : isSemNota(item)) :
            true;
          const filtroNome = filtrarNome(item.titulo);
          const filtroTipo = tipo == 'Todos' ? true : item.tipo == tipo;
          let filtroSituacao = status == 'Todos' ? true : item.status == status || item.status.split('.')[0] == status;
          if (status == 'Arquivados') {
            filtroSituacao = item.status == 'archived';
          }
          return filtroCriador && filtroNome && filtroTipo && filtroSituacao && filtroAv;
        }));
      });
  }

  useEffect(() => {
    getSolicitacoes();
  }, [busca, tipo, status, situacaoNota]);
  return (
    <>
      <Header32 className={styles.titulo}>{usuario.grupo == 2 ? 'Minhas solicitações' : 'Solicitações'}</Header32>
      <section className={styles.section}>
        <div className={styles.esquerda}>
          <div className={styles.inputContainer}>
            <InputContornado
              className={styles.inputPreenchimento}
              placeholder='Pesquisar solicitação...'
              icon={<GoogleIcon>&#xe8b6;</GoogleIcon>}
              handleChange={(e) => setBusca(e.target.value)}
            />
            <div className={styles.inputRow}>
              <DropdownContornado
                className={classNames({
                  [styles.inputPreenchimento]: usuario.grupo <= 2
                })}
                itens={[
                  { label: 'Tipo: Todos', icon: <GoogleIcon>&#xEB75;</GoogleIcon> },
                  { label: 'Tipo: Feature', icon: <GoogleIcon>&#xE8B8;</GoogleIcon> },
                  { label: 'Tipo: Hotfix', icon: <GoogleIcon>&#xf10b;</GoogleIcon> }
                ]}
                handleSelected={(s: string) => setTipo(s.split(' ')[1])}
              />
              {usuario.grupo >= 3 ?
                <DropdownContornado
                  className={styles.inputPreenchimento}
                  itens={[
                    { label: `Situação: Sem nota de ${strAvaliador(usuario.grupo)}`, icon: <GoogleIcon>&#xE46E;</GoogleIcon>, value: 'semNota' },
                    { label: 'Situação: Todos', icon: <GoogleIcon>&#xEB75;</GoogleIcon>, value: 'Todos' }
                  ]}
                  handleSelected={(s: string) => setSituacaoNota(s)}
                /> :
                <DropdownContornado
                  className={styles.inputPreenchimento}
                  itens={[
                    { label: 'Status: Todos', icon: <GoogleIcon>&#xEB75;</GoogleIcon>, value: 'Todos' },
                    { label: 'Status: Recentes', icon: <GoogleIcon>&#xE8B5;</GoogleIcon>, value: 'Recentes' },
                    { label: 'Status: Em avaliação', icon: <GoogleIcon>&#xE46E;</GoogleIcon>, value: 'Em avaliação' },
                    { label: 'Status: Em produção', icon: <GoogleIcon>&#xE179;</GoogleIcon>, value: 'Em produção' },
                    { label: 'Status: Arquivados', icon: <GoogleIcon>&#xE2C8;</GoogleIcon>, value: 'Arquivados' }
                  ]}
                  handleSelected={(s: string) => setStatus(s)}
                />}
            </div>
          </div>
          {usuario.grupo == 2 && <div className={styles.inputContainer}>
            <Botao
              handleClick={() => {
                nav('/criar-solicitacao');
              }}
              className={styles.botao}>
              Criar solicitação
            </Botao>
          </div>}
          <div
            onClick={() => setSolicSelecionada(undefined)}
            className={styles.listContainer}>
            {solicitacoes.length ?
              solicitacoes.map(solic => (
                <ItemSolicitacao
                  key={solic.id}
                  solicitacao={solic}
                  handleClick={() => {
                    setSolicSelecionada(solic);
                    Solicitacoes.getByID(solic.id).then(solicitacao => {
                      setSolicSelecionada(solicitacao);
                    })
                  }}
                  isSelecionado={solicSelecionada ? solic.id == solicSelecionada.id : false} />
              )) : <span className={styles['not-found']}>Nenhuma solicitação encontrada.</span>}
          </div>
        </div>
        <div className={styles.direita}>
          {solicSelecionada ?
            <div className={styles['solic-container']}>
              <h2 className={styles['solic-titulo']}>
                <span className={styles['solic-tipo']}>
                  [{solicSelecionada.tipo}]
                </span>
                {solicSelecionada.titulo}
              </h2>
              <BadgeStatus status={solicSelecionada.status} />
              {solicSelecionada.status.split('.')[0] == 'Em produção' &&
                <div className={styles['solic-info']}>
                  <span className={styles.content}>
                    <span>{'Status: '}</span>
                    <span className={classNames({
                      [styles.new]: solicSelecionada.status.split('.')[1] == 'New',
                      [styles['on-holding']]: solicSelecionada.status.split('.')[1] == 'On Holding',
                      [styles.done]: solicSelecionada.status.split('.')[1] == 'Done',
                    })}>
                      {solicSelecionada.status.split('.')[1]}
                    </span>
                  </span>
                </div>}
              {solicSelecionada.status == 'Em avaliação' &&
                <span className={styles['solic-em-av']}>
                  {solicSelecionada.ratings.length ?
                    solicSelecionada.ratings.map(nota => (
                      <div>
                        <span>{`${nota.committee}: `}</span>
                        <span className={classNames(
                          nota.committee == 'Impacto' ? {
                            [styles['impacto-0']]: nota.value == 0,
                            [styles['impacto-1']]: nota.value == 1,
                            [styles['impacto-2']]: nota.value == 2,
                            [styles['impacto-3']]: nota.value == 3,
                          } :
                            {
                              [styles['av-0']]: nota.value == 0,
                              [styles['av-1']]: nota.value == 1,
                              [styles['av-2']]: nota.value == 2,
                              [styles['av-3']]: nota.value == 3,
                            })}>{nota.value}</span>
                      </div>
                    )) :
                    <span>Sem avaliações</span>
                  }
                </span>
              }
              <div className={styles['solic-datas']}>
                <span>
                  {'Criado em '}
                  {new Date(solicSelecionada.data_criacao).toLocaleDateString('pt-br', {
                    day: "2-digit",
                    month: "2-digit",
                    year: "numeric",
                    hour: "numeric",
                    minute: "numeric",
                    hour12: false
                  })}
                </span>
                {solicSelecionada.data_edicao &&
                  <span>
                    {'Editado em '}
                    {new Date(solicSelecionada.data_edicao).toLocaleDateString('pt-br', {
                      day: "2-digit",
                      month: "2-digit",
                      year: "numeric",
                      hour: "numeric",
                      minute: "numeric",
                      hour12: false
                    })}
                  </span>}
                {solicSelecionada.status == 'archived' && (
                  <span>
                    {'Arquivado em '}
                    {new Date(solicSelecionada.data_arquivado).toLocaleDateString('pt-br', {
                      day: "2-digit",
                      month: "2-digit",
                      year: "numeric",
                      hour: "numeric",
                      minute: "numeric",
                      hour12: false
                    })}
                  </span>
                )}
              </div>
              <div className={styles['solic-info']}>
                <span>Descrição</span>
                {solicSelecionada.descricao}
              </div>
              <div className={styles['solic-arqs']}>
                <span>Anexos</span>
                <span className={styles.arquivos}>
                  {solicSelecionada.attachments &&
                    solicSelecionada.attachments.map(arquivo => (
                      <BotaoPreenchido
                        key={arquivo.id}
                        className={styles.arquivo}
                        handleClick={() => window.open(`http://localhost:3001${arquivo.url}`, '_blank')}>
                        {arquivo.fileName}
                      </BotaoPreenchido>
                    ))}
                </span>
              </div>
              <div className={styles['solic-espacador']}></div>
              {usuario.grupo == 1 && <div className={styles['solic-botoes']}>
                {solicSelecionada.status == 'Recentes' &&
                  <Botao
                    handleClick={() => {
                      setConfirmLiberarAv(true);
                    }}
                    className={styles.botao}>
                    Liberar para avaliação
                  </Botao>}
                {solicSelecionada.status == 'Em avaliação' && solicSelecionada.ratings.length >= 2 &&
                  <Botao
                    handleClick={() => {
                      setConfirmLiberarProd(true);
                    }}
                    className={styles.botao}>
                    Liberar para produção
                  </Botao>}
                {solicSelecionada.status == 'Recentes' &&
                  <Botao
                    handleClick={() => {
                      nav(`/editar-solicitacao/${solicSelecionada.id}`);
                    }}
                    className={styles.botao}>
                    Editar
                  </Botao>}
                {solicSelecionada.status == 'archived' ?
                  <Botao
                    handleClick={() => {
                      setConfirmDesarquivar(true);
                    }}
                    className={styles.botao}>
                    Desarquivar
                  </Botao> :
                  <Botao
                    handleClick={() => setConfirmArquivar(true)}
                    className={styles.botao}>
                    Arquivar
                  </Botao>
                }
                <Botao
                  handleClick={() => setConfirmExcluir(true)}
                  className={styles.botao}>
                  Excluir
                </Botao>
              </div>}
              {usuario.grupo >= 3 && isSemNota(solicSelecionada) &&
                <div className={styles['solic-botoes']}>
                  <Botao className={styles.botao}>
                    Avaliar
                  </Botao>
                </div>}
            </div>
            : <span className={styles['not-found']}>
              Nenhuma solicitação selecionada. Para abrir alguma, clique em uma delas na lista ao lado.
            </span>}
        </div>
      </section>
      <PopupCarregando visivel={carregando} />
      {solicSelecionada &&
        <>
          {/* excluir */}
          <PopupAlerta
            visivel={confirmExcluir}
            titulo={`Excluir ${solicSelecionada.titulo}?`}
            descricao={`Após a exclusão desta, não será possível recupera-la.`}
            onClose={() => setConfirmExcluir(false)}
            onConfirm={() => {
              setConfirmExcluir(false);
              setCarregando(true);
              Solicitacoes.deletar(solicSelecionada.id)
                .then(() => {
                  setCarregando(false);
                  setSucessoExcluir(true);
                }).catch(() => {
                  setCarregando(false);
                  setFalhaExcluir(true);
                });
            }} />
          <PopupConfirm
            visivel={sucessoExcluir}
            onClose={() => {
              getSolicitacoes();
              setSolicSelecionada(undefined);
              setSucessoExcluir(false);
            }}
            titulo='Solicitação excluída'
            descricao='Solicitação excluída com sucesso.'
          />
          <PopupErro
            visivel={falhaExcluir}
            onClose={() => {
              setFalhaExcluir(false);
            }}
            titulo='Erro ao excluir solicitação'
            descricao='Não foi possível excluir a solicitação por conta de um erro interno do servidor, tente novamente mais tarde.'
          />

          {/* arquivar */}
          <PopupAprovacao
            visivel={confirmArquivar}
            titulo={`Arquivar ${solicSelecionada.titulo}?`}
            descricao={`A solicitação após arquivada, poderá ser recuperada retornando ao último status antes de ser arquivada.`}
            onClose={() => setConfirmArquivar(false)}
            onConfirm={() => {
              setConfirmArquivar(false);
              setCarregando(true);
              Solicitacoes.arquivar(solicSelecionada.id)
                .then(() => {
                  setCarregando(false);
                  setSucessoArquivar(true);
                }).catch(() => {
                  setCarregando(false);
                  setFalhaArquivar(true);
                });
            }} />
          <PopupConfirm
            visivel={sucessoArquivar}
            onClose={() => {
              getSolicitacoes();
              setSolicSelecionada(undefined);
              setSucessoArquivar(false);
            }}
            titulo='Solicitação arquivada'
            descricao='Solicitação arquivada com sucesso.'
          />
          <PopupErro
            visivel={falhaArquivar}
            onClose={() => {
              setFalhaArquivar(false);
            }}
            titulo='Erro ao arquivar solicitação'
            descricao='Não foi possível arquivar a solicitação por conta de um erro interno do servidor, tente novamente mais tarde.'
          />

          {/* desarquivar */}
          <PopupAprovacao
            visivel={confirmDesarquivar}
            titulo={`Desarquivar ${solicSelecionada.titulo}?`}
            descricao={`A solicitação retornará à última etapa antes de ser arquivada.`}
            onClose={() => setConfirmDesarquivar(false)}
            onConfirm={() => {
              setConfirmDesarquivar(false);
              setCarregando(true);
              // TROCAR PARA DESARQUIVAR!!!
              Solicitacoes.arquivar(solicSelecionada.id)
                .then(() => {
                  setCarregando(false);
                  setSucessoDesarquivar(true);
                }).catch(() => {
                  setCarregando(false);
                  setFalhaDesarquivar(true);
                });
            }} />
          <PopupConfirm
            visivel={sucessoDesarquivar}
            onClose={() => {
              getSolicitacoes();
              setSolicSelecionada(undefined);
              setSucessoDesarquivar(false);
            }}
            titulo='Solicitação desarquivada'
            descricao='Solicitação desarquivada com sucesso.'
          />
          <PopupErro
            visivel={falhaDesarquivar}
            onClose={() => {
              setFalhaDesarquivar(false);
            }}
            titulo='Erro ao desarquivar a solicitação'
            descricao='Não foi possível desarquivar a solicitação por conta de um erro interno do servidor, tente novamente mais tarde.'
          />

          {/* lib av */}
          <PopupAprovacao
            visivel={confirmLiberarAv}
            titulo={`Liberar para avaliação a solicitação ${solicSelecionada.titulo}?`}
            descricao={`Ao liberar para avaliação, não será mais possível edita-lo.`}
            onClose={() => setConfirmLiberarAv(false)}
            onConfirm={() => {
              setConfirmLiberarAv(false);
              setCarregando(true);
              Solicitacoes.liberarParaAvaliacao(solicSelecionada.id)
                .then(() => {
                  setCarregando(false);
                  setSucessoLiberarAv(true);
                }).catch(() => {
                  setCarregando(false);
                  setFalhaLiberarAv(true);
                });
            }} />
          <PopupConfirm
            visivel={sucessoLiberarAv}
            onClose={() => {
              getSolicitacoes();
              setSolicSelecionada(undefined);
              setSucessoLiberarAv(false);
            }}
            titulo='Solicitação liberada para avaliação'
            descricao='Solicitação liberada para avaliação com sucesso.'
          />
          <PopupErro
            visivel={falhaLiberarAv}
            onClose={() => {
              setFalhaLiberarAv(false);
            }}
            titulo='Erro ao liberar para avaliação'
            descricao='Não foi possível liberar para avaliação por conta de um erro interno do servidor, tente novamente mais tarde.'
          />

          {/* lib prod */}
          <PopupAprovacao
            visivel={confirmLiberarProd}
            titulo={`Liberar para produção a solicitação ${solicSelecionada.titulo}?`}
            descricao=''
            onClose={() => setConfirmLiberarProd(false)}
            onConfirm={() => {
              setConfirmLiberarProd(false);
              setCarregando(true);
              Solicitacoes.liberarParaProducao(solicSelecionada.id)
                .then(() => {
                  setCarregando(false);
                  setSucessoLiberarProd(true);
                }).catch(() => {
                  setCarregando(false);
                  setSucessoLiberarProd(true);
                });
            }} />
          <PopupConfirm
            visivel={sucessoLiberarProd}
            onClose={() => {
              getSolicitacoes();
              setSolicSelecionada(undefined);
              setSucessoLiberarProd(false);
            }}
            titulo='Solicitação liberada para produção'
            descricao='Solicitação liberada para avaliação com sucesso.'
          />
          <PopupErro
            visivel={falhaLiberarProd}
            onClose={() => {
              setFalhaLiberarAv(false);
            }}
            titulo='Erro ao liberar para produção'
            descricao='Não foi possível liberar para produção por conta de um erro interno do servidor, tente novamente mais tarde.'
          />
        </>
      }
    </>
  );
}