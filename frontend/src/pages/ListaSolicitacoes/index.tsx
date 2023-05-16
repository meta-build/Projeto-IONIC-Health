import styles from './ListaSolicitacoes.module.scss';
import { useEffect, useState } from 'react';
import GoogleIcon from '../../components/GoogleIcon';
import { Header32 } from '../../components/Header';
import { InputContornado } from '../../components/Inputs';
import { DropdownContornado } from '../../components/Dropdowns';
import Solicitacoes from '../../services/Solicitacoes';
import ItemSolicitacao from '../../components/ItemSolicitacao';
import { EditarSolicitacaoProps, RatingProps, SolicitacaoProps } from '../../types';
import classNames from 'classnames';
import BadgeStatus from '../../components/BadgeStatus';
import { Botao, BotaoPreenchido } from '../../components/Botoes';
import { useContexto } from '../../context/contexto';
import { useLocation, useNavigate } from 'react-router-dom';
import PopupAlerta from '../../popUps/PopupAlerta';
import PopupConfirm from '../../popUps/PopupConfirm';
import PopupCarregando from '../../popUps/PopupCarregando';
import PopupErro from '../../popUps/PopupErro';
import PopupAprovacao from '../../popUps/PopupAprovacao';
import { AprovarParaProducao, AvaliarSolicitacao } from '../../popUps';

export default function ListaSolicitacoes() {
  const nav = useNavigate();
  const loc = useLocation();
  const { usuario } = useContexto();

  const [busca, setBusca] = useState('');
  const [tipo, setTipo] = useState('Todos');
  const [status, setStatus] = useState('Todos');
  const [situacaoNota, setSituacaoNota] = useState('semNota')

  const [solicitacoes, setSolicitacoes] = useState([]);
  const [solicSelecionada, setSolicSelecionada] = useState<SolicitacaoProps>();

  const [carregando, setCarregando] = useState(false);

  const [avaliar, setAvaliar] = useState(false);

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

  const strSituacao = (situacao: string) => {
    switch (situacao) {
      case 'Recentes': return 'RECENT';
      case 'Em avaliação': return 'RATING';
      case 'RECENT': return 'Recente';
      case 'RATING': return 'Em avaliação';
      case 'NEW': return 'Em produção';
      case 'ONHOLDING': return 'Em produção';
      case 'DONE': return 'Em produção';

    }
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

  const isSemNota = (solic: SolicitacaoProps): boolean => {
    const notas = solic.ratings
    return Boolean(!notas.find(nota => nota.committee == usuario.role.name));
  }

  const getSolicitacoes = () => {
    console.log(usuario)
    Solicitacoes.getAll()
      .then(data => {
        setSolicitacoes(data.filter((item: SolicitacaoProps) => {
          const filtroNota = loc.pathname == '/solicitacoes-para-avaliar' ?
            (situacaoNota == 'semNota' ?
              (!item.ratings.find(rating => rating.committee == usuario.role.name)) : true)
            : true;
          const filtroDono = loc.pathname == '/minhas-solicitacoes' ?
            item.requesterId == usuario.id : true;
          const filtroAv = loc.pathname == '/solicitacoes-para-avaliar' ?
            (item.status == 'RATING' && !item.isArchived) : true;
          const filtroProd = loc.pathname == '/solicitacoes-em-prod' ?
            (item.status == 'NEW' || item.status == 'ONHOLDING' || item.status == 'DONE') : true;
          const filtroNome = filtrarNome(item.title);
          const filtroTipo = tipo == 'Todos' ? true : item.type == tipo.toUpperCase();
          let filtroSituacao = status == 'Todos' ? true : item.status == strSituacao(status);
          if (status == 'Em produção') {
            filtroSituacao = item.status == 'NEW' || item.status == 'ONHOLDING' || item.status == 'DONE';
          }
          if (status == 'Arquivados') {
            filtroSituacao = item.isArchived;
          }
          return filtroNome && filtroTipo && filtroSituacao && filtroAv && filtroProd && filtroDono && filtroNota;
        }));
      });
  }

  useEffect(() => {
    getSolicitacoes();
  }, [busca, tipo, status, situacaoNota]);
  return (
    <>
      <Header32 className={styles.titulo}>
        {loc.pathname == '/solicitacoes' ? 'Solicitações' :
          loc.pathname == '/minhas-solicitacoes' ? 'Minhas solicitações' :
            loc.pathname == '/solicitacoes-para-avaliar' ? 'Solicitações para avaliar' :
              'Solicitações em produção'}
      </Header32>
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
                  [styles.inputPreenchimento]: loc.pathname !== '/solicitacoes-para-avaliar'
                })}
                itens={[
                  { label: 'Tipo: Todos', icon: <GoogleIcon>&#xEB75;</GoogleIcon> },
                  { label: 'Tipo: Feature', icon: <GoogleIcon>&#xE8B8;</GoogleIcon> },
                  { label: 'Tipo: Hotfix', icon: <GoogleIcon>&#xf10b;</GoogleIcon> }
                ]}
                handleSelected={(s: string) => setTipo(s.split(' ')[1])}
              />
              {loc.pathname == '/solicitacoes-para-avaliar' ?
                <DropdownContornado
                  className={styles.inputPreenchimento}
                  itens={[
                    { label: `Situação: Sem nota de ${usuario.role.name}`, icon: <GoogleIcon>&#xE46E;</GoogleIcon>, value: 'semNota' },
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
                />
              }
            </div>
          </div>
          {loc.pathname == '/minhas-solicitacoes' &&
            <div className={styles.inputContainer}>
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
                    });
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
                  {solicSelecionada.type}
                </span>
                {solicSelecionada.title}
              </h2>
              <BadgeStatus status={solicSelecionada.isArchived ? 'ARCHIVED' : solicSelecionada.status} />
              {!solicSelecionada.isArchived && (solicSelecionada.status == 'NEW' || solicSelecionada.status == 'ONHOLDING' || solicSelecionada.status == 'DONE') &&
                <div className={styles['solic-info']}>
                  <span className={styles.content}>
                    <span>{'Status: '}</span>
                    <span className={classNames({
                      [styles.new]: solicSelecionada.status,
                      [styles['on-holding']]: solicSelecionada.status,
                      [styles.done]: solicSelecionada.status,
                    })}>
                      {solicSelecionada.status}
                    </span>
                  </span>
                </div>}
              {!solicSelecionada.isArchived && solicSelecionada.status == 'RATING' &&
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
                  {new Date(solicSelecionada.createdAt).toLocaleDateString('pt-br', {
                    day: "2-digit",
                    month: "2-digit",
                    year: "numeric",
                    hour: "numeric",
                    minute: "numeric",
                    hour12: false
                  })}
                </span>
                {solicSelecionada.updatedAt &&
                  <span>
                    {'Editado em '}
                    {new Date(solicSelecionada.updatedAt).toLocaleDateString('pt-br', {
                      day: "2-digit",
                      month: "2-digit",
                      year: "numeric",
                      hour: "numeric",
                      minute: "numeric",
                      hour12: false
                    })}
                  </span>}
                {solicSelecionada.isArchived && (
                  <span>
                    {'Arquivado em '}
                    {new Date(solicSelecionada.archivedAt).toLocaleDateString('pt-br', {
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
                {solicSelecionada.description}
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
              <div className={styles['solic-botoes']}>
                {!solicSelecionada.isArchived && solicSelecionada.status == 'RECENT' &&
                  <>
                    {usuario.role.permissions.find(perm => perm.id == 12) &&
                      <Botao
                        handleClick={() => {
                          setConfirmLiberarAv(true);
                        }}
                        className={styles.botao}>
                        Liberar para avaliação
                      </Botao>}
                    {usuario.role.permissions.find(perm => perm.id == 8) &&
                      <Botao
                        handleClick={() => {
                          nav(`/editar-solicitacao/${solicSelecionada.id}`);
                        }}
                        className={styles.botao}>
                        Editar
                      </Botao>}
                  </>
                }
                {!solicSelecionada.isArchived && solicSelecionada.status == 'RATING' &&
                  <>
                    {usuario.role.permissions.find(perm => perm.id == 11) &&
                      <Botao
                        handleClick={() => {
                          setConfirmLiberarProd(true);
                        }}
                        className={styles.botao}>
                        Liberar para produção
                      </Botao>}
                    {usuario.role.permissions.find(perm => perm.id == 14) && isSemNota(solicSelecionada) &&
                      <Botao
                        handleClick={() => setAvaliar(true)}
                        className={styles.botao}>
                        Avaliar
                      </Botao>}
                  </>
                }
                {solicSelecionada.isArchived ?
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
                {usuario.role.permissions.find(perm => perm.id == 9) &&
                  <Botao
                    handleClick={() => setConfirmExcluir(true)}
                    className={styles.botao}>
                    Excluir
                  </Botao>}
              </div>
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
            titulo={`Excluir ${solicSelecionada.title}?`}
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
            titulo={`Arquivar ${solicSelecionada.title}?`}
            descricao={`A solicitação após arquivada, poderá ser recuperada retornando ao último status antes de ser arquivada.`}
            onClose={() => setConfirmArquivar(false)}
            onConfirm={() => {
              setConfirmArquivar(false);
              setCarregando(true);
              Solicitacoes.atualizar(solicSelecionada.id, {
                assignedRoleId: null,
                description: solicSelecionada.description,
                isArchived: true,
                status: solicSelecionada.status,
                title: solicSelecionada.title
              })
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
            titulo={`Desarquivar ${solicSelecionada.title}?`}
            descricao={`A solicitação retornará à última etapa antes de ser arquivada.`}
            onClose={() => setConfirmDesarquivar(false)}
            onConfirm={() => {
              setConfirmDesarquivar(false);
              setCarregando(true);
              console.log(solicSelecionada.assignedRoleId)
              Solicitacoes.atualizar(solicSelecionada.id, {
                assignedRoleId: solicSelecionada.assignedRoleId,
                description: solicSelecionada.description,
                isArchived: false,
                status: solicSelecionada.status,
                title: solicSelecionada.title
              })
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
            titulo={`Liberar para avaliação a solicitação ${solicSelecionada.title}?`}
            descricao={`Ao liberar para avaliação, não será mais possível edita-lo.`}
            onClose={() => setConfirmLiberarAv(false)}
            onConfirm={() => {
              setConfirmLiberarAv(false);
              setCarregando(true);
              Solicitacoes.atualizar(solicSelecionada.id, {
                assignedRoleId: solicSelecionada.assignedRoleId,
                description: solicSelecionada.description,
                isArchived: solicSelecionada.isArchived,
                status: 'RATING',
                title: solicSelecionada.title
              })
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
          {/* <PopupAprovacao
            visivel={confirmLiberarProd}
            titulo={`Liberar para produção a solicitação ${solicSelecionada.title}?`}
            descricao=''
            onClose={() => setConfirmLiberarProd(false)}
            onConfirm={() => {
              setConfirmLiberarProd(false);
              setCarregando(true);
              Solicitacoes.liberarParaProducao(solicSelecionada.id, {
                assignedRoleId: solicSelecionada.assignedRoleId,
                description: solicSelecionada.description,
                isArchived: solicSelecionada.isArchived,
                status: solicSelecionada.status,
                title: solicSelecionada.title
              })
                .then(() => {
                  setCarregando(false);
                  setSucessoLiberarProd(true);
                }).catch(() => {
                  setCarregando(false);
                  setSucessoLiberarProd(true);
                });
            }} /> */}
            <AprovarParaProducao
            aberto={confirmLiberarProd}
            onClose={() => setConfirmLiberarProd(false)}
            idSolic={solicSelecionada.id}
            onConfirm={() => console.log()}
            />
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
          <AvaliarSolicitacao
            aberto={avaliar}
            onClose={() => {
              setAvaliar(false);
              getSolicitacoes();
              setSolicSelecionada(undefined);
            }}
            idSolic={solicSelecionada.id}
          />
        </>
      }
    </>
  );
}