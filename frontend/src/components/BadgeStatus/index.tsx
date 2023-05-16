import classNames from 'classnames';
import styles from './BadgeStatus.module.scss';

interface Props {
  status: 'ARCHIVED' | 'RECENT' | 'RATING' | 'NEW' | 'ONHOLDING' | 'DONE';
  className?: string;
}

export default function ({status, className}: Props) {
  const strStatus = (status: string) => {
    switch (status) {
      case 'RECENT':
        return 'Recente';
      case 'ARCHIVED':
        return 'Arquivado';
      case 'RATING':
        return status;
      default:
        return 'Em produção';
    }
  }
  
  return(
    <span className={classNames({
      [styles.status]: true,
      [styles.recente]: status == 'RECENT',
      [styles['em-avaliacao']]: status == 'RATING',
      [styles['em-producao']]: (status == 'NEW' || status == 'ONHOLDING' || status == 'DONE'),
      [styles.arquivado]: status == 'ARCHIVED',
      [className]: true
    })}>
      {strStatus(status)}
    </span>
  )
}