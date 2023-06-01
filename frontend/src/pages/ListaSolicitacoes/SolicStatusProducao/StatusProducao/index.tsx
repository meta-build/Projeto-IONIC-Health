import classNames from "classnames";
import styles from './StatusProducao.module.scss';
import New from '../../../../assets/new.png';
import Onholding from '../../../../assets/onholding.png';
import Done from '../../../../assets/done.png';

interface Props {
  type: "ACTIVE" | "ALREADY" | "DESACTIVE";
  status: "NEW" | "ONHOLDING" | "DONE";
  date: Date;
}

export default function StatusProducao(props: Props) {
  const padronizeStatus = (status: "NEW" | "ONHOLDING" | "DONE") => {
    switch (status) {
      case 'NEW': return "New";
      case 'ONHOLDING': return "On Holding";
      case 'DONE': return "Done";
    }
  }

  const getIcon = () => {
    switch(props.status) {
      case "NEW": return New;
      case "ONHOLDING": return Onholding
      case "DONE": return Done;
    }
  }

  return (
    <div className={classNames({
      [styles['solic-status']]: true,
      [styles[props.status.toLowerCase()]]: true,
      [styles[props.type.toLowerCase()]]: true
    })}>
      <img src={getIcon()} className={styles['status-icon']} />
      <div className={styles['solic-status-info']}>
        <div className={styles['solic-status-title']}>
          {padronizeStatus(props.status)}
        </div>
        {props.type !== 'DESACTIVE' &&
          <div className={styles['solic-status-subtitle']}>
            {props.date.toLocaleDateString('pt-br', {
              day: "2-digit",
              month: "2-digit",
              year: "numeric",
              hour: "numeric",
              minute: "numeric",
              hour12: false
            })}
          </div>}
      </div>
    </div>
  );
}