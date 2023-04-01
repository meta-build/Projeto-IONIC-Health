import classNames from 'classnames';
import styles from './BotaoNota.module.scss';
import { useState } from 'react';

interface Props {
    cor?: 'cinza' | 'verde' | 'azul1' | 'azul2' | 'amarelo' | 'vermelho';
    valor: number;
    handleClick: () => void;
    selecionado: boolean;
    className?: string | any;
}

export default function BotaoNota (props: Props) {
    const {cor = 'cinza'} = props;

    return(
        <div className={props.className}>
            <button
            className={classNames({
                [styles.botao]: true,
                [styles[`${cor}-contorno`]]: true,
                [styles[`${cor}-preenchimento`]]: props.selecionado
            })}
            onClick={props.handleClick}
            >
                {props.valor}
            </button>
        </div>
    );
}