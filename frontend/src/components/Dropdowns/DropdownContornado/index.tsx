import styles from './DropdownContornado.module.scss';
import classNames from "classnames";
import { ReactNode, useEffect, useRef, useState } from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown, faChevronUp } from "@fortawesome/free-solid-svg-icons";
import DropdownItem from '../../../types/DropdownItem';

interface Props {
    itens: DropdownItem[];
    children?: ReactNode;
    handleSelected: (selected: string) => void;
    icon?: JSX.Element;
}

export default function DropdownContornado (props: Props) {
    const botaoRef = useRef<HTMLButtonElement>(null);

    const [aberto, setAberto] = useState(false);
    const [selecionado, setSelecionado] = useState(props.itens[0]);

    return(
        <div className={styles.container}>
            <button
            ref={botaoRef}
            onClick={() => setAberto(!aberto)}
            onBlur={() => setAberto(false)}
            className={classNames({
                [styles.botao]: true
            })}>
                <span className={styles.icon}>
                    {selecionado.getIcon()}
                </span>
                <span className={styles.children}>
                    {selecionado.getLabel()}
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
                    props.handleSelected(item.getLabel())
                }}>
                    <span className={styles.icon}>
                        {item.getIcon()}
                    </span>
                    {item.getLabel()}
                </li>
            ))}
            </ul>}
            </button>
        </div>
    );
}