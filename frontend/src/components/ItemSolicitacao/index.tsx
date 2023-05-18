import classNames from 'classnames';
import GoogleIcon from '../GoogleIcon';
import styles from './ItemSolicitacao.module.scss';
import { SolicitacaoProps } from '../../types';
import BadgeStatus from '../BadgeStatus';

interface Props {
  solicitacao: SolicitacaoProps;
  handleClick: () => void;
  isSelecionado: boolean;
}

export default function ItemSolicitacao({ solicitacao, handleClick, isSelecionado }: Props) {
  const strStatus = (status: string) => {
    switch (status) {
      case 'Recentes':
        return 'Recente';
      case 'archived':
        return 'Arquivado';
      case 'Em avaliação':
        return status;
      default:
        return 'Em produção';
    }
  }

  return (
    <li
      className={classNames({
        [styles.container]: true,
        [styles[`selecionado-recente`]]: isSelecionado && solicitacao.status == 'RECENT',
        [styles[`selecionado-em-av`]]: isSelecionado && solicitacao.status == 'RATING',
        [styles[`selecionado-em-prod`]]: isSelecionado && (solicitacao.status == 'NEW' || solicitacao.status == 'ONHOLDING' || solicitacao.status == 'DONE'),
        [styles[`selecionado-arq`]]: isSelecionado && solicitacao.isArchived,
      })}
      onClick={(e) => {
        e.stopPropagation();
        handleClick();
      }}>
      <div className={styles.top}>
        {solicitacao.type == 'FEATURE' ?
          <GoogleIcon className={styles.icon}>&#xe8b8;</GoogleIcon> :
          <GoogleIcon className={styles.icon}>&#xf10b;</GoogleIcon>
        }
        <span className={styles.titulo}>
          [{solicitacao.type}] {solicitacao.title}
        </span>
        <BadgeStatus status={solicitacao.isArchived ? 'ARCHIVED' : solicitacao.status} />
      </div>
      <div className={styles.bottom}>

        {/* recente/arquivado */}
        {(solicitacao.status == 'RECENT' || solicitacao.isArchived) && (
          <span className={classNames({
            [styles.arquivado]: solicitacao.isArchived,
          })}>
            {solicitacao.isArchived && (
              <span>
                Arquivado em {new Date(solicitacao.archivedAt).toLocaleDateString('pt-br', {
                  day: "2-digit",
                  month: "2-digit",
                  year: "numeric",
                  hour: "numeric",
                  minute: "numeric",
                  hour12: false
                })}
              </span>
            )}
            {!solicitacao.isArchived && (solicitacao.updatedAt ?
              <span>
                Editado em
                {new Date(solicitacao.updatedAt).toLocaleDateString('pt-br', {
                  day: "2-digit",
                  month: "2-digit",
                  year: "numeric",
                  hour: "numeric",
                  minute: "numeric",
                  hour12: false
                })}
              </span> :
              <span>
                Criado em
                {new Date(solicitacao.createdAt).toLocaleDateString('pt-br', {
                  day: "2-digit",
                  month: "2-digit",
                  year: "numeric",
                  hour: "numeric",
                  minute: "numeric",
                  hour12: false
                })}
              </span>)}
          </span>)}

        {/* em avaliação */}
        {!solicitacao.isArchived && solicitacao.status == 'RATING' &&
          <span className={styles.content}>
            {solicitacao.ratings.length ?
              solicitacao.ratings.map(nota => (
                <>
                  <span>{nota.committee}:</span>
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
                </>
              )) :
              <span>Sem avaliações</span>
            }
          </span>
        }

        {/* em produção */}
        {!solicitacao.isArchived && (solicitacao.status == 'NEW' || solicitacao.status == 'ONHOLDING' || solicitacao.status == 'DONE') &&
          <span className={styles.content}>
            <span>Status:</span>
            <span className={classNames({
              [styles.new]: solicitacao.status == 'NEW',
              [styles['on-holding']]: solicitacao.status == 'ONHOLDING',
              [styles.done]: solicitacao.status == 'DONE',
            })}>
              {solicitacao.status}
            </span>
          </span>
        }
      </div>
    </li>
  );
}