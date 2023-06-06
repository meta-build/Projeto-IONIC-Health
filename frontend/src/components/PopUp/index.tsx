import { ReactNode, useEffect, useState } from 'react';
import { Header32 } from '../Header';
import styles from './PopUp.module.scss';
import IconeClicavel from '../Botoes/IconeClicavel';
import GoogleIcon from '../GoogleIcon';
import classNames from 'classnames';
import { AnimatePresence, easeOut, motion } from 'framer-motion';

interface Props {
  titulo: string;
  children: ReactNode;
  visivel: boolean;
  onClose: () => void;
  icone?: JSX.Element;
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
    <AnimatePresence>
      {props.visivel &&
        <motion.div
          onClick={() => fechar()}
          className={classNames({
            [styles.background]: true
          })}
          initial={{ backgroundColor: 'rgba(0, 0, 0, 0)', backdropFilter: 'blur(0px)' }}
          animate={{ backgroundColor: 'rgba(0, 0, 0, 0.6)', backdropFilter: 'blur(4px)' }}
          exit={{ backgroundColor: 'rgba(0, 0, 0, 0)', backdropFilter: 'blur(0px)' }}
          transition={{ duration: 0.3 }}
        >
          <motion.div
            className={styles.popup}
            onClick={(e) => e.stopPropagation()}
            initial={{ opacity: 0, y: '100%', x: '-50%' }}
            animate={{ opacity: 1, y: '-50%', x: '-50%' }}
            exit={{ opacity: 0, y: '100%', x:'-50%' }}
            transition={{ duration: 0.3 }}>
            <IconeClicavel
              icone={
                <GoogleIcon>&#xe5cd;</GoogleIcon>
              }
              handleClick={() => fechar()}
              className={styles.fechar}
            />
            {props.icone && props.icone}
            <Header32 className={styles.titulo}>{props.titulo}</Header32>
            {props.children}
          </motion.div>
        </motion.div>}
    </AnimatePresence>
  );
}