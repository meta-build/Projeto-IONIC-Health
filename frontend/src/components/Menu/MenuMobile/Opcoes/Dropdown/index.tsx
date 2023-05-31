import { useState } from 'react';
import styles from './Dropdown.module.scss';
import GoogleIcon from '../../../../GoogleIcon';
import classNames from 'classnames';
import { AnimatePresence, motion } from 'framer-motion';

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
  const [open, setOpen] = useState(false);

  return (
    <motion.button
      onBlur={() => setOpen(false)}
      className={styles.botao}
      >
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
      <AnimatePresence>
        {open &&
          <motion.ul
            className={styles.items}
            initial={{ opacity: 0, y: -20, height: 0 }}
            animate={{ opacity: 1, y: 0, height: "auto" }}
            exit={{ opacity: 0, y: -20, height: 0 }}
            transition={{ duration: 0.25 }}
          >
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
          </motion.ul>
        }
      </AnimatePresence>
    </motion.button>
  );
}