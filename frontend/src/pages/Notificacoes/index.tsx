import styles from './Notifs.module.scss';
import GoogleIcon from "../../components/GoogleIcon";
import { Header32 } from '../../components/Header';
import { useEffect, useState } from 'react';
import { NotificationProps } from '../../types';
import Notificacoes from '../../services/Notificacoes';
import { useContexto } from '../../context/contexto';
import NotifItem from './NotifItem';
import { useNavigate } from 'react-router-dom';

export default function Notifs() {
  const [notifs, setNotifs] = useState<NotificationProps[]>([]);
  const { usuario } = useContexto();
  const nav = useNavigate();

  const excluir = (id: number) => {
    Notificacoes.deletar(id)
    const tempNotif = notifs.filter(notif => notif.id !== id);
    setNotifs(tempNotif);
  }

  useEffect(() => {
    Notificacoes.getByUsuario(usuario.id)
      .then(notifs => setNotifs(notifs));
  }, []);
  return (
    <section className={styles.container}>
      <button
      onClick={() => nav(-1)}
      className={styles['back-button']}>
        <GoogleIcon
          className={styles['back-icon']}>
          &#xe5cb;
        </GoogleIcon>
        <span className={styles['back-span']}>Voltar</span>
      </button>
      <Header32
        className={styles.header}>
        Notificações
      </Header32>
      <div className={styles.notifs}>
        {notifs.length ? notifs.map(notif => (
          <NotifItem
            key={notif.id}
            date={notif.createdAt}
            title={notif.text.split('.')[0]}
            onClick={() => excluir(notif.id)} />
        )) : <span className={styles['no-notif']}>Sem notificações</span>}
      </div>
    </section>
  )
}