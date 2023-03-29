import { ReactNode } from "react";
import styles from './Botao.module.scss';

interface Props {
    children: ReactNode;
    handleClick: () => void;
    variante?: 'preenchido' | 'contornado'; 
}

export function Botao (props: Props) {
    const {variante = 'contornado'} = props;

    return(
        <button
        className={`${styles.botao} ${styles[variante]}`}
        onClick={props.handleClick}>
            {props.children}
        </button>
    );
}