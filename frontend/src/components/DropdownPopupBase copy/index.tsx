import styles from './DropdownPopup.module.scss';
import classNames from "classnames";
import { ReactNode, useState } from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown, faChevronUp } from "@fortawesome/free-solid-svg-icons";

interface Props {
    itens: string[];
    children?: ReactNode;
    handleSelected: (selected: string) => void;
}

export default function DropdownPopup (props: Props) {
    const [aberto, setAberto] = useState(false);
    const [selecionado, setSelecionado] = useState('');

    return(
        <div className={styles.container}>
            <button
            onClick={() => setAberto(!aberto)}
            className={classNames({
                [styles.botao]: true
            })}>
                <span className={styles.children}>
                    {selecionado !== '' ? selecionado : (props.children === undefined ? props.itens[0] : props.children)}
                </span>
                {aberto ? <FontAwesomeIcon icon={faChevronUp} className={styles.icon} /> : <FontAwesomeIcon icon={faChevronDown} className={styles.icon} />}
            </button>

            {aberto && 
            <ul className={styles.list} >
            {props.itens.map(item => (
                <li><button onClick={() => {setSelecionado(item); setAberto(false); props.handleSelected(item)}}>{item}</button></li>
            ))}
            </ul>}
        </div>
    );
}