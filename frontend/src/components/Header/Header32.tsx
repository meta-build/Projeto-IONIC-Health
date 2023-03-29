import { ReactElement } from 'react';
import styles from './Header.module.scss';

export function Header32 ({children}: any) {
    return(
        <h1 className={`${styles.header} ${styles.header32}`}>
            {children}
        </h1>
    )
}