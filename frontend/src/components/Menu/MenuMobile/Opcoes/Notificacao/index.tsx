import styles from './Notificacao.module.scss';

interface Props {
  value: number
}

export default function Notificacao (props: Props) {
  return(
    <div className={styles.notif}>
      {props.value}
    </div>
  );
}