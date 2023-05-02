import { ReactNode } from 'react';
import styles from './Header.module.scss';
import classNames from 'classnames';

interface Props {
  className?: string;
  children: ReactNode;
}

export function Header32(props: Props) {
  return (
    <h1 className={classNames({
      [styles.header]: true,
      [styles.header32]: true,
      [props.className]: true
    })}>
      {props.children}
    </h1>
  );
}