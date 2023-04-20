import classNames from 'classnames';
import styles from './InputPopup.module.scss';
import { useState } from 'react';

interface Props {
    icon?: JSX.Element;
    placeholder?: string;
    className?: string | any;
    handleChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
    valor: string;
    tipo?: React.HTMLInputTypeAttribute;
    onFocus?: () => void;
}
export default function InputPopup (props: Props) {
    const [tipo, setTipo] = useState(props.tipo ?? 'text');
    return(
        <>
            <input
            className={classNames({
                [styles.input]: true,
                [props.className]: true
            })}
            onChange={props.handleChange}
            onFocus={props.onFocus}
            placeholder={props.placeholder}
            value={props.valor}
            type={tipo}
            />
        </>
    );
}