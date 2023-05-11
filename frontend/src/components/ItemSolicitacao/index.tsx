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
      [styles[`selecionado-recente`]]: isSelecionado && solicitacao.status == 'Recentes',
      [styles[`selecionado-em-av`]]: isSelecionado && solicitacao.status == 'Em avaliação',
      [styles[`selecionado-em-prod`]]: isSelecionado && solicitacao.status.split('.')[0] == 'Em produção',
      [styles[`selecionado-arq`]]: isSelecionado && solicitacao.status == 'archived',
    })}
    onClick={handleClick}>
      <div className={styles.top}>
        <GoogleIcon className={styles.icon}>&#xe8b8;</GoogleIcon>
        <span className={styles.titulo}>
          [{solicitacao.tipo}] {solicitacao.titulo}
        </span>
        <BadgeStatus status={solicitacao.status} />
      </div>
      <div className={styles.bottom}>

        {/* recente/arquivado */}
        {(solicitacao.status == 'Recentes' || solicitacao.status == 'archived') && (
          <span className={classNames({
            [styles.arquivado]: solicitacao.status == 'archived',
          })}>
            {solicitacao.status == 'archived' && (
              <span>
                Arquivado em {new Date(solicitacao.data_arquivado).toLocaleDateString('pt-br', {
                  day: "2-digit",
                  month: "2-digit",
                  year: "numeric",
                  hour: "numeric",
                  minute: "numeric",
                  hour12: false
                })}
              </span>
            )}
            {solicitacao.status !== 'archived' && (solicitacao.data_edicao ?
              <span>
                Editado em
                {new Date(solicitacao.data_edicao).toLocaleDateString('pt-br', {
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
                {new Date(solicitacao.data_criacao).toLocaleDateString('pt-br', {
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
        {solicitacao.status == 'Em avaliação' &&
          <span className={styles.content}>
            {solicitacao.ratings.length ?
              solicitacao.ratings.map(nota => (
                <>
                  <span>{nota.committee}:</span>
                  <span className={classNames(
                    nota.committee == 'Impacto' ? {
                      [styles.arquivado]: nota.value == 0,
                      [styles['em-avaliacao']]: nota.value == 1,
                      [styles['em-producao']]: nota.value == 2,
                      [styles.recente]: nota.value == 3,
                    } :
                      {
                        [styles['em-avaliacao']]: nota.value == 1,
                        [styles['em-producao']]: nota.value == 2,
                        [styles.arquivado]: nota.value == 3,
                      })}>{nota.value}</span>
                </>
              )) :
              <span>Sem avaliações</span>
            }
          </span>
        }

        {/* em produção */}
        {solicitacao.status.split('.')[0] == 'Em produção' &&
          <span className={styles.content}>
            <span>Status:</span>
            <span className={classNames({
              [styles.new]: solicitacao.status.split('.')[1] == 'New',
              [styles['on-holding']]: solicitacao.status.split('.')[1] == 'On Holding',
              [styles.done]: solicitacao.status.split('.')[1] == 'Done',
            })}>
              {solicitacao.status.split('.')[1]}
            </span>
          </span>
        }
      </div>
    </li>
  );
}