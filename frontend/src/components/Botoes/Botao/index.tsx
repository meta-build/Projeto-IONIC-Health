import { ReactNode } from "react";
import styles from './Botao.module.scss';
import classNames from "classnames";

interface Props {
  children: ReactNode;
  handleClick?: () => void;
  variante?: 'preenchido' | 'contornado';
  className?: string | any;
  tipo?: "button" | "submit"
}

export default function Botao(props: Props) {
  const { variante = 'contornado', tipo = 'button' } = props;

  return (
    <button
      className={classNames({
        [styles.botao]: true,
        [styles[variante]]: true,
        [props.className]: true
      })}
      onClick={props.handleClick}
      type={tipo}>
      {props.children}
    </button>
  );
}