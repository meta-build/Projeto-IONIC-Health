import { ReactNode, useEffect, useState } from 'react';
import { Header32 } from '../Header';
import styles from './PopUp.module.scss';
import IconeClicavel from '../Botoes/IconeClicavel';
import GoogleIcon from '../GoogleIcon';
import classNames from 'classnames';

interface Props {
  titulo: string;
  children: ReactNode;
  visivel: boolean;
  onClose: () => void;
}

export default function PopUp(props: Props) {
  const [aberto, setAberto] = useState(props.visivel);

  const fechar = () => {
    props.onClose();
    setAberto(false);
  }

  useEffect(() => {
    setAberto(props.visivel);
  }, [props.visivel]);
  return (
    <div
      onClick={() => fechar()}
      className={classNames({
        [styles.background]: true,
        [styles.fechado]: !aberto
      })}>
      <div className={styles.popup} onClick={(e) => e.stopPropagation()}>
        <IconeClicavel
          icone={
            <GoogleIcon>&#xe5cd;</GoogleIcon>
          }
          handleClick={() => fechar()}
          className={styles.fechar}
        />
        <Header32 className={styles.titulo}>{props.titulo}</Header32>
        {props.children}
      </div>
    </div>
  );
}