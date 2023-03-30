import { ReactNode } from "react"
import styles from './BotaoPopup.module.scss';
import classNames from "classnames";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronRight } from "@fortawesome/free-solid-svg-icons";

interface Props {
    children: ReactNode;
    handleClick: () => void;
    corBotao?: 'claro' | 'noturno'
}

export default function BotaoPopu1p (props: Props) {
    const {corBotao = 'claro'} = props;

    return(
        <button
        onClick={props.handleClick}
        className={classNames({
            [styles.botao]: true,
            [styles[corBotao]]: true 
        })}
        >
            <span className={styles.children}>
                {props.children}
            </span>
            <FontAwesomeIcon icon={faChevronRight} className={styles.icon} />
        </button>
    );
}