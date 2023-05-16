import styles from './Home.module.scss';
import { faFile, faUser } from "@fortawesome/free-regular-svg-icons";
import { BotaoIcon } from "../../components/Botoes";
import { Header36 } from '../../components/Header';
import classNames from 'classnames';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useContexto } from '../../context/contexto';
import GoogleIcon from '../../components/GoogleIcon';

interface HomeItemProps {
  label: string;
  icon: JSX.Element;
  url: string;
}

export default function Home() {
  const history = useNavigate();
  const { usuario } = useContexto();

  const itens = [
    usuario.role.permissions.find(perm => perm.id >= 1 && perm.id <= 3) ?
      { label: 'Usuários', icon: <FontAwesomeIcon icon={faUser} />, url: '/usuarios' } : null,
    usuario.role.permissions.find(perm => perm.id >= 4 && perm.id <= 6) ?
      { label: 'Grupos', icon: <GoogleIcon>&#xf233;</GoogleIcon>, url: '/grupos' } : null,
    usuario.role.permissions.find(perm => perm.id >= 8 && perm.id <= 12) ?
      { label: 'Solicitações', icon: <FontAwesomeIcon icon={faFile} />, url: '/solicitacoes' } : null,
    usuario.role.permissions.find(perm => perm.id == 1) ?
      { label: 'Minhas Solicitações', icon: <GoogleIcon>&#xf22e;</GoogleIcon>, url: '/minhas-solicitacoes' } : null,
    usuario.role.permissions.find(perm => perm.id == 14) ?
      { label: 'Solicitações para avaliar', icon: <GoogleIcon>&#xe46e;</GoogleIcon>, url: '/solicitacoes-para-avaliar' } : null,
    // usuario.role.permissions.find(perm => perm.id == 13) ?
    //   { label: 'Solicitações em produção', icon: <GoogleIcon>&#xe179;</GoogleIcon>, url: '/solicitacoes-em-producao' } : null,
  ].filter(Boolean) as HomeItemProps[];

  return (
    <div className={styles.container}>
      <Header36 className={styles.children}>Bem-vindo, {usuario.name}</Header36>
      <div className={classNames({
        [styles['container-button']]: true
      })}>
        {itens.map((item, index) => (
          <BotaoIcon
            key={index}
            className={styles['children-button']}
            handleClick={() => history(item.url)}
            icon={item.icon}>
            {item.label}
          </BotaoIcon>
        ))}
      </div>
    </div>
  );
}