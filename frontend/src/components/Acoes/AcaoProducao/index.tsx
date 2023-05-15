import classNames from 'classnames';
import styles from './AcaoProducao.module.scss';

interface Props {
  status: 'new' | 'on-holding' | 'done';
}

export default function AcaoProducao(props: Props) {

  const strStatus = (status: string) => {
    switch (status) {
      case 'new':
        return 'New';
      case 'on-holding':
        return 'On Holding';
      default:
        return 'Done'
    }
  }

  return (
    <div className={styles.container}>
      <span className={styles.label}>
        Status:
      </span>
      <span className={classNames({
        [styles.status]: true,
        [styles[props.status]]: true
      })}>
        {strStatus(props.status)}
      </span>
    </div>
  );
}