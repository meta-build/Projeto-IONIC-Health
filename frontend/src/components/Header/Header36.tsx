import { ReactNode } from 'react';
import styles from './Header.module.scss';
import classNames from 'classnames';

interface Props {
  children: ReactNode;
  className?: string;
}

export function Header36(props: Props) {
  return (
    <h1
      className={classNames({
        [styles.header]: true,
        [styles.header36]: true,
        [props.className]: true
      })}
    >
      {props.children}
    </h1>
  );
}