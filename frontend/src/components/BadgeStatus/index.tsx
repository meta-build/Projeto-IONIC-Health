import classNames from 'classnames';
import styles from './BadgeStatus.module.scss';

interface Props {
  status: string;
}

export default function ({status}: Props) {
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
  
  return(
    <span className={classNames({
      [styles.status]: true,
      [styles.recente]: status == 'Recentes',
      [styles['em-avaliacao']]: status == 'Em avaliação',
      [styles['em-producao']]: status.split('.')[0] == 'Em produção',
      [styles.arquivado]: status == 'archived',
    })}>
      {strStatus(status)}
    </span>
  )
}