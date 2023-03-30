import { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import styles from './BotaoIcon.module.scss';
import { ReactNode } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames';

interface Props {
    icon: IconDefinition;
    children: ReactNode;
    handleClick: () => void;
    className?: string;
}

export default function BotaoIcon (props: Props) {
    const {className = ''} = props;

    return(
        <div className={classNames({
            [styles.container]: true,
            [className]: true
        }) }>
            <button onClick={props.handleClick}>
                <FontAwesomeIcon icon={props.icon} />
            </button>
            <span>{props.children}</span>
        </div>
    );
}