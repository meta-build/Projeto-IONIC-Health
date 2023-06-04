import classNames from "classnames";
import styles from './SolicStatusProducao.module.scss';
import { GrupoProps, SolicitacaoProps } from "../../../../../types";
import { useEffect, useState } from "react";
import Grupos from "../../../../../services/Grupos";
import StatusProducao from "./StatusProducao";

interface Props {
  solic: SolicitacaoProps
}

export default function SolicStatusProducao(props: Props) {
  const [roleName, setRoleName] = useState('');

  const statusType = (status: "RECENT" | "RATING" | "NEW" | "ONHOLDING" | "DONE"): "ACTIVE" | "ALREADY" | "DESACTIVE" => {
    if (status == props.solic.status) {
      return 'ACTIVE';
    } else {
      switch(props.solic.status) {
        case 'NEW':
          return 'DESACTIVE';
        case 'ONHOLDING':
          return status == 'DONE' ? 'DESACTIVE' : 'ALREADY';
        case 'DONE':
          return 'ALREADY';
      }
    }
  }

  useEffect(() => {
    Grupos.getByID(props.solic.assignedRoleId)
    .then(gp => setRoleName(gp.name))
    .catch(() => setRoleName('Grupo não encontrado'));
  }, [])
  return (
    <div className={styles['solic-info']}>
      <span>Status de produção</span>
      <div className={styles['solic-group']}>
        Grupo de produção
        <div className={styles['group-name']}>
          {roleName !== '' ? roleName : 'Carregando...'}
        </div>
      </div>
      <div className={styles['solic-list-status']}>
        <StatusProducao
        date={new Date(props.solic.statusNewAt)}
        status="NEW"
        type={statusType('NEW')} />
        <StatusProducao
        date={new Date(props.solic.statusOnHoldingAt)}
        status="ONHOLDING"
        type={statusType('ONHOLDING')} />
        <StatusProducao
        date={new Date(props.solic.statusDoneAt)}
        status="DONE"
        type={statusType('DONE')} />
      </div>
    </div>
  );
}