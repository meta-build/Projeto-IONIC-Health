import styles from './MenuDesktop.module.scss';
import MenuSuspenso from '../../MenuSuspenso';
import { faBell, faUser } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useEffect, useState } from 'react';
import { faCaretDown, faCheck, faLevelDown, faUpDown } from '@fortawesome/free-solid-svg-icons';
import EditarConta from '../../../popUps/EditarConta';
import { useContexto } from '../../../context/contexto';
import { useLocation, useNavigate } from 'react-router-dom';
import api from '../../../services/api';
import iconeIonic from '../../../assets/iconeIonic.png';
import profileIonic from '../../../assets/profileIonic.png';
import classNames from 'classnames';
import Notificacoes from '../../../services/Notificacoes';
import { NotificationProps } from '../../../types';


export default function MenuDesktop() {

  const [notificacao, setNotificacao] = useState(false);
  const [notifs, setNotifs] = useState<NotificationProps[]>([]);
  const [popupEditar, setPopupEditar] = useState(false);
  const [activeItem, setActiveItem] = useState('');
  const { usuario, setUsuario } = useContexto();
  const nav = useNavigate();
  const history = useNavigate();

  const loc = useLocation();

  const isActiveRoute = (route: string): boolean => {
    console.log(loc.pathname === route)
    return loc.pathname === route
  }

  const excluir = (id: number) => {
    Notificacoes.deletar(id);
    const tempNotifs = notifs.filter(notif => notif.id !== id);
    setNotifs(tempNotifs);
  }

  function handlePath(caminho: string) {
    if (caminho === 'home') {
      history('/home')
    } else if (caminho === 'solicitacoes') {
      history('/solicitacoes')
    } else if (caminho === 'usuarios') {
      history('/usuarios')
    } else {
      history('/grupos')
    }
  }

  useEffect(() => {
    Notificacoes.getByUsuario(usuario.id)
      .then(notifs => {
        setNotifs(notifs);
        if (notifs.length) {
          setNotificacao(true);
        }
      })
  }, [loc.pathname]);
  return (
    <>
      <nav
        id='desktop'
        className={styles.container}>
        {/* logo */}
        <img src={iconeIonic} />
        <nav className={styles.headerNav}>
          <ul>
            <li className={isActiveRoute('/home') ? styles.Active : "home"} onClick={() => nav('/home')} >Home</li>
            <MenuSuspenso
              icon={
                <li
                  // className={isActiveRoute('/solicitacoes') ? styles.Active : "solicitacao"}
                  className={classNames({
                    [styles.item]: true,
                    [styles.Active]: loc.pathname == '/solicitacoes' || loc.pathname == '/minhas-solicitacoes' || loc.pathname == '/solicitacoes-para-avaliar' || loc.pathname == '/solicitacoes-em-producao'
                  })}>
                  <span style={{ 'marginRight': '12px' }}>Solicitações</span>
                  <FontAwesomeIcon icon={faCaretDown} />
                </li>}>
              <ul className={styles['menu-lista']}>
                {usuario.permissions.find(perm => perm.id >= 8 && perm.id <= 12) &&
                  <li
                    onClick={() => nav('/solicitacoes')}
                    className={styles['menu-item']}>
                    Solicitações
                  </li>}
                {usuario.permissions.find(perm => perm.id == 7) &&
                  <li
                    onClick={() => nav('/minhas-solicitacoes')}
                    className={styles['menu-item']}>
                    Minhas solicitações
                  </li>}
                {usuario.permissions.find(perm => perm.id == 14) &&
                  <li
                    onClick={() => nav('/solicitacoes-para-avaliar')}
                    className={styles['menu-item']}>
                    Solicitações para avaliar
                  </li>}
                {usuario.permissions.find(perm => perm.id == 13) &&
                  <li
                    onClick={() => nav('/solicitacoes-em-producao')}
                    className={styles['menu-item']}>
                    Solicitações em produção
                  </li>}
              </ul>
            </MenuSuspenso>

            {usuario.permissions.find(perm => perm.id >= 1 && perm.id <= 3) &&
              <li className={isActiveRoute('/usuarios') ? styles.Active : "usuario"} onClick={() => nav('/usuarios')}>Usuários</li>}
            {usuario.permissions.find(perm => perm.id >= 4 && perm.id <= 6) &&
              <li className={isActiveRoute('/grupos') ? styles.Active : "grupo"} onClick={() => nav('/grupos')}>Grupos</li>}
          </ul>

        </nav>
        {/* espaçador */}
        <div className={styles.espacador} />


        {/* notificação, aparecer somente para solicitante */}
        <MenuSuspenso
          className={styles.icon}
          onOpen={() => setNotificacao(false)}
          icon={
            notificacao ?
              <span className={styles['icon-bolinha']}>
                <FontAwesomeIcon icon={faBell} />
                <span className={styles.bolinha} />
              </span> :
              <FontAwesomeIcon icon={faBell} />
          }>

          <ul className={styles['notificacao-lista']}>
            {notifs.length ? notifs.map(notif => (
              <NotificacaoItem
                key={notif.id}
                titulo={notif.text.split('.')[0]}
                data={new Date(notif.createdAt).toLocaleDateString('pt-br', {
                  day: "2-digit",
                  month: "2-digit",
                  year: "numeric",
                  hour: "numeric",
                  minute: "numeric",
                  hour12: false
                })}
                handleCheckClick={() => excluir(notif.id)}
                handleClick={() => nav(`/minhas-solicitacoes/${notif.text.split('.')[1]}`)}
              />))
              : <div className={styles['no-notifs']}>Sem notificações</div>
            }
          </ul>

        </MenuSuspenso>

        {/* usuário */}
        <span className={styles.nome}>{usuario.name}</span>
        <MenuSuspenso

          icon={<img src={profileIonic} />}>

          <ul className={styles['conta-lista']}>
            <li
              onClick={() => setPopupEditar(true)}
              className={styles['conta-item']}>
              Editar conta
            </li>
            <li
              onClick={() => {
                sessionStorage.clear();
                setUsuario(undefined);
                delete api.defaults.headers.common['Authorization'];
                nav('/');
              }}
              className={styles['conta-item']}>
              Sair
            </li>
          </ul>
        </MenuSuspenso>
      </nav>
      <EditarConta idUser={usuario.id} aberto={popupEditar} onClose={() => setPopupEditar(false)} />
    </>
  );
}

interface NotificacaoProps {
  titulo: string,
  data: string,
  handleCheckClick: () => void;
  handleClick: () => void;
}

function NotificacaoItem(props: NotificacaoProps) {
  const [checkVisivel, setCheckVisivel] = useState(false);

  return (
    <li
      onClick={props.handleClick}
      onMouseEnter={() => setCheckVisivel(true)}
      onMouseLeave={() => setCheckVisivel(false)}
      className={styles['notificacao-item']}>
      <div className={styles['notificacao-titulo']}>{props.titulo}</div>
      <div className={styles['notificacao-data']}>{props.data}</div>
      {checkVisivel && <FontAwesomeIcon
        icon={faCheck}
        className={styles['notificacao-fechar']}
        onClick={(e) => {
          e.stopPropagation();
          props.handleCheckClick();
        }} />}
    </li>
  )
}