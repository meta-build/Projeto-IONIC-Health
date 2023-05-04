import { ReactNode } from 'react';
import classNames from 'classnames';

interface Props {
  className?: string | any;
  children: ReactNode;
}

export default function GoogleIcon(props: Props) {
  return (
    <span className={`material-symbols-outlined ${classNames({
      [props.className]: true
    })}`}>
      {/* &#x + code point + ; */}
      {props.children}
    </span>
  )
}