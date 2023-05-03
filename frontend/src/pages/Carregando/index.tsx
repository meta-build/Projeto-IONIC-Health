import styles from './Carregando.module.scss';
import GoogleIcon from "../../components/GoogleIcon";

export default function Carregando () {
  return(
    <div className={styles.container}>
      <GoogleIcon className={styles.icon}>&#xe86a;</GoogleIcon>
      <span className={styles.label}>Carregando...</span>
    </div>
  );
}