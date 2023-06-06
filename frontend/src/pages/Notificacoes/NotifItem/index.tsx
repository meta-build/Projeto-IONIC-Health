import GoogleIcon from '../../../components/GoogleIcon';
import styles from './NotifItem.module.scss';

interface Props {
  title: string;
  date: string;
  onClick: () => void;
}

export default function NotifItem(props: Props) {
  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <span className={styles.title}>
          {props.title}
        </span>
        <span className={styles.data}>
          {new Date(props.date).toLocaleDateString('pt-br', {
            day: "2-digit",
            month: "2-digit",
            year: "numeric",
            hour: "numeric",
            minute: "numeric",
            hour12: false
          })}
        </span>
      </div>
      <button className={styles['check-btn']}>
        <GoogleIcon>&#xe876;</GoogleIcon>
      </button>
    </div>
  )
}