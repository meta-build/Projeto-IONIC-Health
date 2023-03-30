import { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import styles from './BotaoIcon.module.scss';
import { ReactNode } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

interface Props {
    icon: IconDefinition;
    children: ReactNode;
    handleClick: () => void;
}

export default function BotaoIcon (props: Props) {
    return(
        <div className={styles.container}>
            <button onClick={props.handleClick}>
                <FontAwesomeIcon icon={props.icon} />
            </button>
            <span>{props.children}</span>
        </div>
    );
}