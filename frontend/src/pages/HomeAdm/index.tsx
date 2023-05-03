import styles from './HomeAdm.module.scss';
import { faFile, faUser } from "@fortawesome/free-regular-svg-icons";
import { BotaoIcon } from "../../components/Botoes";
import { Header36 } from '../../components/Header';
import classNames from 'classnames';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useState } from 'react';
import { CriarSolicitacao } from '../../popUps';

interface HomeItemProps {
  label: string;
  icon: JSX.Element;
  url: string;
}

export default function HomeAdm() {
  const history = useNavigate();

  const [popup, setPopup] = useState(false);

  const itens: HomeItemProps[] = [
    { label: 'Usuários', icon: <FontAwesomeIcon icon={faUser} />, url: '/usuarios' },
    { label: 'Solicitações', icon: <FontAwesomeIcon icon={faFile} />, url: '/solicitacoes' }
  ];

  return (
    <div className={styles.container}>
      <Header36 className={styles.children}>Home</Header36>
      <div className={classNames({
        [styles['container-button']]: true,
        [styles.children]: true
      })}>
        <BotaoIcon
          className={styles['children-button']}
          handleClick={() => history(itens[1].url)}
          icon={itens[1].icon}
        >
          {itens[1].label}
        </BotaoIcon>
        <BotaoIcon
          className={styles['children-button']}
          handleClick={() => history(itens[0].url)}
          icon={itens[0].icon}
        >
          {itens[0].label}
        </BotaoIcon>
      </div>
      <CriarSolicitacao aberto={popup} onClose={() => setPopup(false)} />
    </div>
  );
}