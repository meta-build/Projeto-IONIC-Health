import { ReactElement, ReactNode } from 'react';
import styles from './Header.module.scss';
import classNames from 'classnames';

interface Props {
    className?: string;
    children: ReactNode;
}

export function Header32 (props: Props) {
    const {children, className = ''} = props

    return(
        <h1 className={classNames({
            [styles.header]: true,
            [styles.header32]: true,
            [className]: true
        })}>
            {children}
        </h1>
    )
}