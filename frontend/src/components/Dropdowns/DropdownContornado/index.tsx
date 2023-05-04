import styles from './DropdownContornado.module.scss';
import classNames from "classnames";
import { ReactNode, useState } from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown, faChevronUp } from "@fortawesome/free-solid-svg-icons";

interface DropdownItem {
  label: string;
  icon: JSX.Element;
}

interface Props {
  itens: DropdownItem[];
  children?: ReactNode;
  handleSelected: (selected: string) => void;
  icon?: JSX.Element;
}

export default function DropdownContornado(props: Props) {
  const [aberto, setAberto] = useState(false);
  const [selecionado, setSelecionado] = useState(props.itens[0]);

  return (
    <div className={styles.container}>
      <button
        onClick={() => setAberto(!aberto)}
        onBlur={() => setAberto(false)}
        className={classNames({
          [styles.botao]: true
        })}>
        <span className={styles.icon}>
          {selecionado.icon}
        </span>
        <span className={styles.children}>
          {selecionado.label}
        </span>
        {aberto ?
          <FontAwesomeIcon icon={faChevronUp} className={styles.arrow} /> :
          <FontAwesomeIcon icon={faChevronDown} className={styles.arrow} />}

        {aberto &&
          <ul className={styles.list} >
            {props.itens.map((item, index) => (
              <li
                key={index}
                onClick={() => {
                  setSelecionado(item);
                  setAberto(false);
                  props.handleSelected(item.label)
                }}>
                <span className={styles.icon}>
                  {item.icon}
                </span>
                {item.label}
              </li>
            ))}
          </ul>}
      </button>
    </div>
  );
}