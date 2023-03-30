import { ReactNode } from 'react';
import styles from './Header.module.scss';
import classNames from 'classnames';

interface Props {
    children: ReactNode;
    className?: string;
}

export function Header36 (props: Props) {
    const {className = ''} = props;

    return(
        // className={`${styles.header} ${styles.header36}`
        <h1 
            className={classNames({
                [styles.header]: true,
                [styles.header36]: true,
                [className]: true
            })}
        >
            {props.children}
        </h1>
    )
}