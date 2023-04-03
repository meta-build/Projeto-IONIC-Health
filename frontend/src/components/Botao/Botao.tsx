import { ReactNode } from "react";
import styles from './Botao.module.scss';
import classNames from "classnames";

interface Props {
    children: ReactNode;
    handleClick: () => void;
    variante?: 'preenchido' | 'contornado';
    className: string | any;
}

export function Botao (props: Props) {
    const {variante = 'contornado'} = props;

    return(
        <button
        // className={`${styles.botao} ${styles[variante]}`}
        className={classNames({
            [styles.botao]: true,
            [styles[variante]]: true,
            [props.className]: true
        })}
        onClick={props.handleClick}>
            {props.children}
        </button>
    );
}