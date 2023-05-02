import { ReactNode } from "react"
import styles from './BotaoPopup.module.scss';
import classNames from "classnames";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronRight } from "@fortawesome/free-solid-svg-icons";

interface Props {
  children: ReactNode;
  handleClick?: () => void;
  corBotao?: 'claro' | 'noturno';
  tipo?: 'button' | 'submit' | 'reset';
  className?: string | any;
}

export default function BotaoPopup(props: Props) {
  const { corBotao = 'claro', tipo = 'button' } = props;

  return (
    <button
      onClick={props.handleClick}
      className={classNames({
        [styles.botao]: true,
        [styles[corBotao]]: true,
        [props.className]: true
      })}
      type={tipo}
    >
      <span className={styles.children}>
        {props.children}
      </span>
      <FontAwesomeIcon icon={faChevronRight} className={styles.icon} />
    </button>
  );
}