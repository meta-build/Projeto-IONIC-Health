import styles from './MenuMobile.module.scss';
import iconeIonic from '../../../assets/iconeIonic.png';
import { useContexto } from '../../../context/contexto';
import PopupErro from '../../../popUps/PopupErro';
import { useState } from 'react';
import Opcoes from './Opcoes';
import GoogleIcon from '../../GoogleIcon';

export default function MenuMobile() {
  const { usuario, setUsuario } = useContexto();
  const [open, setOpen] = useState(false);
  const [notif, setNotif] = useState(true);

  return (
    <>
      <nav
      className={styles.container}
      id='mobile'>
        <img
          src={iconeIonic}
          className={styles.logo} />
        <span className={styles.name}>
          {'Olá, '}
          {usuario.name.split(' ')[0]}
        </span>
        <button
        className={styles['hamburguer-button']}
        onClick={() => {
          setOpen(true);
          setNotif(false)
          }}>
          <GoogleIcon className={styles.icon}>
            &#xe5d2;
          </GoogleIcon>
          {notif && <div className={styles.notification} />}
        </button>
      </nav>
      <Opcoes
      visivel={open}
      onClose={() => setOpen(false)}
      />
    </>
  );
}