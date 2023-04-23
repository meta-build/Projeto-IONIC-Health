import styles from './DropdownContornado.module.scss';
import classNames from "classnames";
import { ReactNode, useState } from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown, faChevronUp } from "@fortawesome/free-solid-svg-icons";
<<<<<<< HEAD
// import DropdownItem from '../../types/DropdownItem';
=======
>>>>>>> dfd2ff03740720490063e964ed7f389a8e2298dd

interface Props {
    itens: string[];
    children?: ReactNode;
    handleSelected: (selected: string) => void;
    selecionadoFst?: string;
    className?: string;
    onOpen?: () => void;
}

export default function DropdownPreenchido (props: Props) {
    const [aberto, setAberto] = useState(false);
    const [selecionado, setSelecionado] = useState(props.selecionadoFst || props.itens[0]);

    return(
        <div className={styles.container}>
            <button
<<<<<<< HEAD
            onClick={() => setAberto(!aberto)}
=======
            onClick={() => {
                setAberto(!aberto);
                if (props.onOpen) {
                    props.onOpen();
                }
            }}
            onBlur={() => setAberto(false)}
>>>>>>> dfd2ff03740720490063e964ed7f389a8e2298dd
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
<<<<<<< HEAD
                <li key={index}><button onClick={() => {setSelecionado(item); setAberto(false); props.handleSelected(item)}} >
=======
                <li
                key={index}
                onClick={() => {
                    setSelecionado(item);
                    setAberto(false);
                    props.handleSelected(item)
                }}>
>>>>>>> dfd2ff03740720490063e964ed7f389a8e2298dd
                    {item}
                </li>
            ))}
            </ul>}
            </button>
        </div>
    );
}