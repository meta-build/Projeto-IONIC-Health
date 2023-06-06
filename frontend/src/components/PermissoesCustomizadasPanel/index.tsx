import { useEffect, useState } from 'react';
import { DropdownContornado } from '../Dropdowns';
import styles from './PermissoesCustomizadasPanel.module.scss';
import { PermissionProps } from '../../types';
import Permissoes from '../../services/Permissoes';
import { BotaoSwitch } from '../Botoes';
import classNames from 'classnames';

interface Props {
  permEscolhidas: number[],
  addPermission: (number) => void;
  removePermission: (number) => void;
}

export default function PermissoesCustomizadasPanel(props:Props) {
  const[ aba, setAba] = useState('Solicitações');
  const [perms, setPerms] = useState<PermissionProps[]>([]);

  useEffect(() => {
    Permissoes.getAll().then(perms => {
      setPerms(perms);
    });
  }, [])
  return (
    <div className={styles.container}>
      <div className={styles['aba-container']}>
        <DropdownContornado
        itens={[
          {icon: <></>, label: 'Solicitações', value: 'Solicitações'},
          {icon: <></>, label: 'Usuários', value: 'Usuários'},
          {icon: <></>, label: 'Grupos', value: 'Grupos'},
        ]}
        handleSelected={select => setAba(select)}
        />
      </div>
      <ul className={styles.perms}>
        {perms && perms.filter(perm => {
          if (aba == 'Solicitações') {
            return perm.humanizedEntity == 'Solicitações' || perm.humanizedEntity == 'Avaliações'
          } else {
            return perm.humanizedEntity == aba;
          }
        })
          .map(perm => (
            <li className={styles['perms-item']}>
              <BotaoSwitch
                isActive={props.permEscolhidas.includes(perm.id)}
                handleClick={(value) => {
                  if (value) {
                    // setPermsEscolhidas(prevState => [...prevState, perm.id])
                    props.addPermission(perm.id);
                  } else {
                    // setPermsEscolhidas(prevState => prevState.filter(e => e !== perm.id))
                    props.removePermission(perm.id);
                  }
                }} />
              <div className={classNames({
                [styles['perm-label']]: true,
                [styles.desactive]: !props.permEscolhidas.includes(perm.id)
              })}>{perm.humanizedPermissionName}</div>
            </li>
          ))}
      </ul>
    </div>
  );
}