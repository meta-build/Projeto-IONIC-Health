import styles from './Header.module.scss';

export function Header36 ({children}:any) {
    return(
        <h1 className={`${styles.header} ${styles.header36}`}>
            {children}
        </h1>
    )
}