import styles from './MenuMobile.module.scss';
import iconeIonic from '../../../assets/iconeIonic.png';
import { useContexto } from '../../../context/contexto';
import PopupErro from '../../../popUps/PopupErro';
import { useEffect, useState } from 'react';
import Opcoes from './Opcoes';
import GoogleIcon from '../../GoogleIcon';
import Notificacoes from '../../../services/Notificacoes';
import { useLocation } from 'react-router-dom';

export default function MenuMobile() {
  const { usuario, setUsuario } = useContexto();
  const [open, setOpen] = useState(false);
  const [notif, setNotif] = useState(false);

  const loc = useLocation();

  useEffect(() => {
    Notificacoes.getByUsuario(usuario.id)
    .then(notifs => {
      if (notifs.length) {
        setNotif(true);
      }
      if (loc.pathname == '/notificacoes') {
        setNotif(false);
      }
    });
  }, [loc.pathname]);
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