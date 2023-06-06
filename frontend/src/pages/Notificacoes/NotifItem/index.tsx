import classNames from 'classnames';
import GoogleIcon from '../../../components/GoogleIcon';
import styles from './NotifItem.module.scss';

interface Props {
  title: string;
  date: string;
  onClick: () => void;
  className?: string;
  onClickName: () => void;
}

export default function NotifItem(props: Props) {
  return (
    <div className={classNames({
      [styles.container]: true,
      [props.className]: true
    })}>
      <div
      onClick={props.onClickName}
      className={styles.content}>
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