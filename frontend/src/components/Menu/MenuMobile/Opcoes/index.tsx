import { AnimatePresence, easeIn, easeInOut, easeOut, motion, useAnimation } from 'framer-motion';
import GoogleIcon from '../../../GoogleIcon';
import Dropdown from './Dropdown';
import styles from './Opcoes.module.scss';

interface Props {
  visivel: Boolean;
  onClose: () => void;
}

export default function Opcoes(props: Props) {
  const handleClose = async () => {
    props.onClose();
  };

  return (
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
                  className={styles['botao-button']}>
                  Exemplo
                </button>
              </li>
              <li className={styles.botao}>
                <Dropdown
                  label='dropdown'
                  opcoes={[
                    { label: 'teste 1', onClick: () => console.log('teste') },
                    { label: 'teste 2', onClick: () => console.log('teste 2') }
                  ]}
                />
              </li>
              <li className={styles.botao}>
                <button
                  className={styles['botao-button']}>
                  Exemplo
                </button>
              </li>
              <li className={styles.botao}>
                <button
                  className={styles['botao-button']}>
                  Exemplo
                </button>
              </li>
            </ul>
          </motion.div>
        </motion.div>}
    </AnimatePresence>
  );
}