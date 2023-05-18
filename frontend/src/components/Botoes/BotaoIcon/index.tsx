import styles from './BotaoIcon.module.scss';
import { ReactNode } from 'react';
import classNames from 'classnames';

interface Props {
  icon: JSX.Element;
  children: ReactNode;
  handleClick: () => void;
  className?: string;
}

export default function BotaoIcon(props: Props) {
  return (
    <div className={classNames({
      [styles.container]: true,
      [props.className]: true
    })}>
      <button onClick={props.handleClick}>
        {props.icon}
      </button>
      <span>{props.children}</span>
    </div>
  );
}