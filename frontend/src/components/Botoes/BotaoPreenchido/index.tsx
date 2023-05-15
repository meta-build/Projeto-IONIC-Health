import { ReactNode } from "react"
import styles from './BotaoPreenchido.module.scss';
import classNames from "classnames";

interface Props {
  children: ReactNode;
  handleClick?: () => void;
  corBotao?: 'claro' | 'noturno';
  tipo?: 'button' | 'submit' | 'reset';
  className?: string | any;
}

export default function BotaoPreenchido(props: Props) {
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
      {props.children}
    </button>
  );
}