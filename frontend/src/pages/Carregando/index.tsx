import styles from './Carregando.module.scss';
import GoogleIcon from "../../components/GoogleIcon";
import { AnimatePresence, motion } from 'framer-motion';

export default function Carregando() {
  return (
    <AnimatePresence>
      <motion.div
      initial={{opacity: 0}}
      animate={{opacity: 1}}
      exit={{opacity: 0}}
      transition={{duration: '0.5s'}}
      className={styles.container}>
        <GoogleIcon className={styles.icon}>&#xe86a;</GoogleIcon>
        <span className={styles.label}>Carregando...</span>
      </motion.div>
    </AnimatePresence>
  );
}