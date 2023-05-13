import classNames from 'classnames';
import styles from './Aba.module.scss';
import { ReactNode } from 'react';

interface Props {
  handleClick: () => void;
  isActive: boolean;
  children: ReactNode;
  className?: string;
}

export default function Aba (props: Props) {
  return(
    <button
    type='button'
    className={classNames({
      [styles.botao]: true,
      [styles.ativo]: props.isActive,
      [props.className]: true
    })}
    onClick={props.handleClick}>
      {props.children}
    </button>
  )
}