import styles from './Menu.module.scss';
import MenuSuspenso from '../MenuSuspenso';
import { faBell, faUser } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useState } from 'react';
import { faCheck } from '@fortawesome/free-solid-svg-icons';
import EditarConta from '../../popUps/EditarConta';
import { useContexto } from '../../context/contexto';
import { useLocation, useNavigate } from 'react-router-dom';
import api from '../../services/api';
import iconeIonic from '../../assets/iconeIonic.png';
import profileIonic from '../../assets/profileIonic.png';


export default function Menu() {

  const [notificacao, setNotificacao] = useState(true);
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
  return (
    <>
      <nav className={styles.container}>

        {/* logo */}
        <img src={iconeIonic} />
        <nav className={styles.headerNav}>
          <ul>
            <li className={isActiveRoute('/home') ? styles.Active : "home"} onClick={() => handlePath('home')} >Home</li>
            <li className={isActiveRoute('/solicitacoes') ? styles.Active : "solicitacao"} onClick={() => handlePath('solicitacoes')} >Solicitações</li>
            <li className={isActiveRoute('/usuarios') ? styles.Active : "usuario"} onClick={() => handlePath('usuarios')}>Usuários</li>
            <li className={isActiveRoute('/grupos') ? styles.Active : "grupo"} onClick={() => handlePath('grupos')}>Grupos</li>
          </ul>
          
        </nav>
        {/* espaçador */}
        <div className={styles.espacador} />


        {/* notificação, aparecer somente para solicitante */}
        {/* <MenuSuspenso
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
                        <NotificacaoItem
                        titulo='notificação'
                        data='15/04/2023 às 15h53'
                        handleCheckClick={() => console.log('clicado')}
                        />
                    </ul>
                </MenuSuspenso> */}

        {/* usuário */}
        <span className={styles.nome}>{usuario.nome}</span>
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
}

function NotificacaoItem(props: NotificacaoProps) {
  const [checkVisivel, setCheckVisivel] = useState(false);

  return (
    <li
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