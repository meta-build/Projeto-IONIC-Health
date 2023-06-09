import { AnimatePresence, easeOut, motion} from 'framer-motion'
import GoogleIcon from '../../../GoogleIcon';
import Dropdown from './Dropdown';
import styles from './Opcoes.module.scss';
import Notificacao from './Notificacao';
import classNames from 'classnames';
import { useContexto } from '../../../../context/contexto';
import api from '../../../../services/api';
import { useLocation, useNavigate } from 'react-router-dom';
import { EditarConta } from '../../../../popUps';
import { useEffect, useState } from 'react';
import Notificacoes from '../../../../services/Notificacoes';

interface Props {
  visivel: Boolean;
  onClose: () => void;
}

interface DropdownItem {
  label: string;
  onClick: () => void;
}

export default function Opcoes(props: Props) {
  const { usuario, setUsuario } = useContexto();
  const [popup, setPopup] = useState(false);
  const [notif, setNotif] = useState(false);
  const [notifLength, setNotifLength] = useState<number>();

  const loc = useLocation();

  const solicOptions: DropdownItem[] = [
    usuario.permissions.find(perm => perm.id >= 8 && perm.id <= 12) ?
      {
        label: 'Solicitações',
        onClick: () => {
          nav('/solicitacoes');
          props.onClose();
        }
      } : undefined,
    usuario.permissions.find(perm => perm.id == 7) ?
      {
        label: 'Minhas solicitações',
        onClick: () => {
          nav('/minhas-solicitacoes');
          props.onClose();
        }
      } : undefined,
    usuario.permissions.find(perm => perm.id == 14) ?
      {
        label: 'Solicitações para avaliar',
        onClick: () => {
          nav('/solicitacoes-para-avaliar');
          props.onClose();
        }
      } : undefined,
    usuario.permissions.find(perm => perm.id == 13) ?
      {
        label: 'Solicitações em produção',
        onClick: () => {
          nav('/solicitacoes-em-producao');
          props.onClose();
        }
      } : undefined
  ].filter((value) => value !== undefined) as DropdownItem[];

  const nav = useNavigate();

  const handleClose = async () => {
    props.onClose();
  };

  useEffect(() => {
    Notificacoes.getByUsuario(usuario.id)
    .then(notifs => {
      if (notifs.length) {
        setNotif(true);
        setNotifLength(notifs.length);
      }
      if(loc.pathname == '/notificacoes') {
        setNotif(false);
      }
    });
  }, [loc.pathname]);
  return (
    <>
      <AnimatePresence>
        {props.visivel &&
          <motion.div
            onClick={handleClose}
            className={styles.container}
            initial={{ backgroundColor: 'rgba(0, 0, 0, 0)' }}
            animate={{ backgroundColor: 'rgba(0, 0, 0, 0.6)' }}
            exit={{ backgroundColor: 'rgba(0, 0, 0, 0)' }}
            transition={{ duration: 0.4 }}
          >
            <motion.div
              onClick={(e) => e.stopPropagation()}
              className={styles.menu}
              initial={{ x: '100%' }}
              animate={{ x: '0%' }}
              exit={{ x: '100%' }}
              transition={{ duration: 0.25, ease: easeOut }}
            >
              <div className={styles.top}>
                <h2>Menu</h2>
                <button
                  onClick={handleClose}
                  className={styles.close}>
                  <GoogleIcon>
                    &#xe5cd;
                  </GoogleIcon>
                </button>
              </div>
              <ul className={styles.botoes}>
              <li className={styles.botao}>
                  <button
                    onClick={() => {
                      nav('/home')
                      props.onClose();
                    }}
                    className={styles['botao-button']}>
                    Home
                  </button>
                </li>
                {usuario.permissions.find(perm => perm.id >= 1 && perm.id <= 3) &&
                  <li className={styles.botao}>
                    <button
                      onClick={() => {
                        nav('/usuarios');
                        props.onClose();
                      }}
                      className={styles['botao-button']}>
                      Usuários
                    </button>
                  </li>}
                {usuario.permissions.find(perm => perm.id >= 4 && perm.id <= 6) &&
                  <li className={styles.botao}>
                    <button
                      onClick={() => {
                        nav('/grupos');
                        props.onClose();
                      }}
                      className={styles['botao-button']}>
                      Grupos
                    </button>
                  </li>}
                {usuario.permissions.find(perm => perm.id >= 7 && perm.id <= 14) &&
                  <li className={styles.botao}>
                    <Dropdown
                      label='Solicitações'
                      opcoes={solicOptions}
                    />
                  </li>}
                <li className={styles.botao}>
                  <button
                    onClick={() => {
                      nav('/notificacoes');
                      props.onClose();
                    }}
                    className={styles['botao-button']}>
                    Notificações
                  </button>
                  {notif && notifLength && <Notificacao value={notifLength} />}
                </li>
                <li className={styles.botao}>
                  <button
                    onClick={() => {
                      setPopup(true);
                      props.onClose();
                    }}
                    className={styles['botao-button']}>
                    Editar conta
                  </button>
                </li>
                <li className={styles.botao}>
                  <button
                    onClick={() => {
                      sessionStorage.clear();
                      setUsuario(undefined);
                      delete api.defaults.headers.common['Authorization'];
                      nav('/');
                    }}
                    className={classNames({
                      [styles['botao-button']]: true,
                      [styles.vermelho]: true
                    })}>
                    Sair
                  </button>
                </li>
              </ul>
            </motion.div>
          </motion.div>}
      </AnimatePresence>
      <EditarConta idUser={usuario.id} aberto={popup} onClose={() => setPopup(false)} />
    </>
  );
}