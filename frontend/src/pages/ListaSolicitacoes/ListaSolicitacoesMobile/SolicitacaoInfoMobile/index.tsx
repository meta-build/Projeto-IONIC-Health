import classNames from 'classnames';
import BadgeStatus from '../../../../components/BadgeStatus';
import GoogleIcon from '../../../../components/GoogleIcon';
import { SolicitacaoProps } from '../../../../types';
import styles from './SolicitacaoInfoMobile.module.scss';
import BotaoPreenchido from '../../../../components/Botoes/BotaoPreenchidoEscuro';
import Carregando from '../../../Carregando';
import SolicStatusAvaliacao from './SolicStatusAvaliacao';
import SolicStatusProducao from './SolicStatusProducao';
import { DropdownOpcoes } from '../../../../components/Dropdowns';
import { useContexto } from '../../../../context/contexto';
import { AprovarParaProducao, AvaliarSolicitacao, AlterarStatusProducao } from '../../../../popUps';
import PopupAlerta from '../../../../popUps/PopupAlerta';
import PopupAprovacao from '../../../../popUps/PopupAprovacao';
import PopupConfirm from '../../../../popUps/PopupConfirm';
import PopupErro from '../../../../popUps/PopupErro';
import Solicitacoes from '../../../../services/Solicitacoes';
import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

interface Props {
  solic: SolicitacaoProps;
  onBack: () => void;
}

interface BotaoItem {
  label: string;
  onClick: () => void;
}

export default function SolicitacaoInfoMobile(props: Props) {
  const { usuario } = useContexto();
  const loc = useLocation();
  const nav = useNavigate();

  const [solicitacao, setSolicitacao] = useState<SolicitacaoProps>();

  const [carregando, setCarregando] = useState(false);

  const [avaliar, setAvaliar] = useState(false);
  const [alterarProd, setAlterarProd] = useState(false);

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

  const isSemNota = (solic: SolicitacaoProps): boolean => {
    const notas = solic.ratings
    return Boolean(!notas.find(nota => nota.committee == usuario.role.name));
  }

  const opcoes: BotaoItem[] = [
    (!props.solic.isArchived && props.solic.status === 'RECENT' && usuario.permissions.find(perm => perm.id === 12)) ?
      { label: 'Liberar para avaliação', onClick: () => setConfirmLiberarAv(true) } : null,
    (!props.solic.isArchived && props.solic.status === 'RECENT' && usuario.permissions.find(perm => perm.id === 8)) ?
      { label: 'Editar', onClick: () => nav(`/editar-solicitacao/${props.solic.id}`) } : null,
    (!props.solic.isArchived && props.solic.status === 'RATING' && usuario.permissions.find(perm => perm.id === 11)) ?
      { label: 'Liberar para produção', onClick: () => setConfirmLiberarProd(true) } : null,
    (!props.solic.isArchived && props.solic.status === 'RATING' && usuario.permissions.find(perm => perm.id === 14) && isSemNota(props.solic)) ?
      { label: 'Avaliar', onClick: () => setAvaliar(true) } : null,
    (props.solic.isArchived) ?
      { label: 'Desarquivar', onClick: () => setConfirmDesarquivar(true) } :
      { label: 'Arquivar', onClick: () => setConfirmArquivar(true) },
    (usuario.permissions.find(perm => perm.id === 9)) ?
      { label: 'Excluir', onClick: () => setConfirmExcluir(true) } : null,
    (loc.pathname === '/solicitacoes-em-producao') ?
      { label: 'Alterar status de produção', onClick: () => setAlterarProd(true) } : null,
  ].filter(Boolean) as BotaoItem[];

  useEffect(() => {
    Solicitacoes.getByID(props.solic.id).then(solicitacao => {
      setSolicitacao(solicitacao);
    });
  }, [])
  return (
    <>
      {solicitacao ?
        <>
          <section
            id='mobile'
            className={styles.container}>
            <div className={styles['button-row']}>
              <button
                className={styles.botaoVoltar}
                onClick={props.onBack}
              >
                <GoogleIcon className={styles['icone-seta']}>&#xe5cb;</GoogleIcon>
                <span className={styles.textoVoltar}>Voltar</span>
              </button>
            </div>
            <div className={styles['solic-type']}>
              [{solicitacao.type}]
            </div>
            <div className={styles['solic-title']}>
              {solicitacao.title}
            </div>
            <BadgeStatus status={solicitacao.isArchived ? 'ARCHIVED' : solicitacao.status} />
            <div className={styles['solic-date']}>
              <span>
                {`Criado em `}
                <br></br>
                {`${new Date(solicitacao.createdAt).toLocaleDateString('pt-br', {
                  day: "2-digit",
                  month: "2-digit",
                  year: "numeric"
                })}`}
              </span>
              {solicitacao.updatedAt &&
                <>
                  <div className={styles.bolinha} />
                  <span>
                    {`Editado em`}
                    <br />
                    {` ${new Date(solicitacao.updatedAt).toLocaleDateString('pt-br', {
                      day: "2-digit",
                      month: "2-digit",
                      year: "numeric"
                    })}`}
                  </span>
                </>
              }
            </div>
            <div className={classNames({
              [styles['status-date']]: true,
              [styles['archived']]: solicitacao.isArchived,
              [styles.rating]: solicitacao.status == "RATING"
            })}>
              {solicitacao.isArchived &&
                <span>{'Arquivado em '}
                  {new Date(solicitacao.archivedAt).toLocaleDateString('pt-br', {
                    day: "2-digit",
                    month: "2-digit",
                    year: "numeric",
                    hour: "numeric",
                    minute: "numeric",
                    hour12: false
                  })}
                </span>
              }
              {!solicitacao.isArchived && solicitacao.status == "RATING" &&
                <span>{"Em avaliação desde "}
                  {new Date(solicitacao.archivedAt).toLocaleDateString('pt-br', {
                    day: "2-digit",
                    month: "2-digit",
                    year: "numeric",
                    hour: "numeric",
                    minute: "numeric",
                    hour12: false
                  })}
                </span>
              }
            </div>
            <div className={styles.desc}>
              <div className={styles.label}>
                Descrição
              </div>
              <div className={styles['desc-info']}>
                {solicitacao.description}
              </div>
            </div>
            <div className={styles.files}>
              <div className={styles.label}>
                Anexos
              </div>
              <div className={styles['solic-anexos']}>
                {solicitacao.attachments && solicitacao.attachments.length ?
                  solicitacao.attachments.map(file => (
                    <BotaoPreenchido
                      key={file.id}
                      className={styles.file}
                      handleClick={() => {
                        window.open(`http://localhost:3001${file.url}`, '_blank')
                      }}>
                      {file.fileName}
                    </BotaoPreenchido>
                  )) : <div>Sem anexos</div>
                }
              </div>
            </div>
            <div className={styles.content}>
              {solicitacao.status == "RATING" &&
                <SolicStatusAvaliacao solic={solicitacao} />
              }
              {(solicitacao.status == "NEW" || solicitacao.status == "ONHOLDING" || solicitacao.status == "DONE") &&
                <SolicStatusProducao solic={solicitacao} />
              }
            </div>
            <div className={styles.espacador} />
            <div className={styles.botoes}>
              <DropdownOpcoes options={opcoes} />
            </div>
          </section>
          <PopupAlerta
            visivel={confirmExcluir}
            titulo={`Excluir ${solicitacao.title}?`}
            descricao={`Após a exclusão desta, não será possível recupera-la.`}
            onClose={() => setConfirmExcluir(false)}
            onConfirm={() => {
              setConfirmExcluir(false);
              setCarregando(true);
              Solicitacoes.deletar(solicitacao.id)
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
              props.onBack();
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
            titulo={`Arquivar ${solicitacao.title}?`}
            descricao={`A solicitação após arquivada, poderá ser recuperada retornando ao último status antes de ser arquivada.`}
            onClose={() => setConfirmArquivar(false)}
            onConfirm={() => {
              setConfirmArquivar(false);
              setCarregando(true);
              Solicitacoes.atualizar(solicitacao.id, {
                assignedRoleId: null,
                description: solicitacao.description,
                isArchived: true,
                status: solicitacao.status,
                title: solicitacao.title
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
              props.onBack();
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
            titulo={`Desarquivar ${solicitacao.title}?`}
            descricao={`A solicitação retornará à última etapa antes de ser arquivada.`}
            onClose={() => setConfirmDesarquivar(false)}
            onConfirm={() => {
              setConfirmDesarquivar(false);
              setCarregando(true);
              Solicitacoes.atualizar(solicitacao.id, {
                assignedRoleId: solicitacao.assignedRoleId,
                description: solicitacao.description,
                isArchived: false,
                status: solicitacao.status,
                title: solicitacao.title
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
              props.onBack();
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
            titulo={`Liberar para avaliação a solicitação ${solicitacao.title}?`}
            descricao={`Ao liberar para avaliação, não será mais possível edita-lo.`}
            onClose={() => setConfirmLiberarAv(false)}
            onConfirm={() => {
              setConfirmLiberarAv(false);
              setCarregando(true);
              Solicitacoes.atualizar(solicitacao.id, {
                assignedRoleId: solicitacao.assignedRoleId,
                description: solicitacao.description,
                isArchived: solicitacao.isArchived,
                status: 'RATING',
                title: solicitacao.title
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
          <AprovarParaProducao
            aberto={confirmLiberarProd}
            onClose={() => {
              setConfirmLiberarProd(false);
            }}
            idSolic={solicitacao.id}
            onConfirm={() => {
              setConfirmLiberarProd(false);
              props.onBack();
            }}
          />
          <PopupConfirm
            visivel={sucessoLiberarProd}
            onClose={() => {
              props.onBack();
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
              props.onBack();
            }}
            idSolic={solicitacao.id}
          />
          <AlterarStatusProducao
            aberto={alterarProd}
            idSolic={solicitacao.id}
            onClose={() => {
              setAlterarProd(false);
            }}
            onChange={() => {
              setAlterarProd(false);
              props.onBack();  
            }}
          />
          {carregando && <Carregando />}
        </>
        : <Carregando />}
    </>
  );
}