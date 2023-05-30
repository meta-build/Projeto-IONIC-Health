import { useState } from 'react';
import styles from './Dropdown.module.scss';
import GoogleIcon from '../../../../GoogleIcon';
import classNames from 'classnames';

interface DropdownItem {
  label: string;
  onClick: () => void;
  className?: string;
}

interface Props {
  label: string;
  opcoes: DropdownItem[];
  className?: string;
}

export default function Dropdown(props: Props) {
  const [open, setOpen] = useState(true);

  return (
    <button
      onBlur={() => setOpen(false)}
      className={styles.botao}>
      <div
        onClick={() => setOpen(!open)}
        className={classNames({
          [styles.label]: true,
          [props.className]: true
        })}>
        {props.label}
        {open ?
          <GoogleIcon>
            &#xe5ce;
          </GoogleIcon>
        :
          <GoogleIcon>
            &#xe5cf;
          </GoogleIcon>}
      </div>
      {open &&
        <ul className={styles.items}>
          {props.opcoes.map((item, index) => (
            <li key={index}>
              <button
              className={classNames({
                [styles['item-botao']]: true,
                [item.className]: true
              })}
              onClick={item.onClick}>
                {item.label}
              </button>
            </li>
          ))}
        </ul>
      }
    </button>
  );
}