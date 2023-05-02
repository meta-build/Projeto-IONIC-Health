import styles from './DropdownContornado.module.scss';
import classNames from "classnames";
import { ReactNode, useEffect, useState } from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown, faChevronUp } from "@fortawesome/free-solid-svg-icons";

interface Props {
  itens: string[];
  children?: ReactNode;
  handleSelected: (selected: string) => void;
  selecionadoFst?: string;
  className?: string;
  onOpen?: () => void;
}

export default function DropdownPreenchido(props: Props) {
  const [aberto, setAberto] = useState(false);
  const [selecionado, setSelecionado] = useState(props.selecionadoFst || props.itens[0]);

  useEffect(() => {
    if (props.selecionadoFst) {
      setSelecionado(props.selecionadoFst);
    }
  }, [props.selecionadoFst]);
  return (
    <div className={styles.container}>
      <button
        onClick={() => {
          setAberto(!aberto);
          if (props.onOpen) {
            props.onOpen();
          }
        }}
        onBlur={() => setAberto(false)}
        type='button'
        className={classNames({
          [styles.botao]: true,
          [styles['botao-hover']]: !aberto,
          [props.className]: true
        })}>
        <span className={styles.children}>
          {selecionado}
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
                  props.handleSelected(item)
                }}>
                {item}
              </li>
            ))}
          </ul>}
      </button>
    </div>
  );
}