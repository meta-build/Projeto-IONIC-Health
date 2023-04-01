import { ReactNode, useState } from "react";
import DropdownItem from "../../types/DropdownItem";
import styles from './BotaoGenerico.module.scss';
import classNames from "classnames";
import { faChevronDown, faChevronRight, faChevronUp } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";


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
                {aberto ? <FontAwesomeIcon icon={faChevronRight} className={styles.icon} /> : <FontAwesomeIcon icon={faChevronRight} className={styles.icon} />}
            </button>

        </div>
    );
}