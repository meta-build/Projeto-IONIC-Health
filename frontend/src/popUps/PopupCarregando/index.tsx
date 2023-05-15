import classNames from "classnames";
import GoogleIcon from "../../components/GoogleIcon";
import styles from './PopupCarregando.module.scss';

interface Props {
  visivel: boolean;
}

export default function PopupCarregando (props: Props) {
  return(
    <div className={classNames({
      [styles.container]: true,
      [styles.invisivel]: !props.visivel
    })}>
      <GoogleIcon className={styles.icon}>&#xe86a;</GoogleIcon>
      <span className={styles.label}>Carregando...</span>
    </div>
  );
}