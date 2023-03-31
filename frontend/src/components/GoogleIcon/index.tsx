import { ReactNode } from 'react';
import styles from './GoogleIcon.module.scss';

interface Props {
    className?: string;
    children: ReactNode
}

export default function GoogleIcon (props: Props) {
    const {className = ''} = props;
    return(
        <span className={`material-symbols-outlined ${className}`}>
            {/* &#x + code point + ; */}
            {props.children}
        </span>
    )
}