import { faBell } from "@fortawesome/free-regular-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { IconeClicavel } from "../Botoes"
import styles from './MenuSuspenso.module.scss';
import { ReactNode, useState } from "react";
import classNames from "classnames";

interface Props {
    children: ReactNode;
}

export default function MenuSuspenso (props: Props) {
    const [visivel, setVisivel] = useState(false);

    return(
        <IconeClicavel
        className={classNames({
            [styles.icone]: true,
            [styles['icone-hover']]: !visivel
        })}
        handleClick={() => setVisivel(!visivel)}
        onBlur={() => setVisivel(false)}
        icone={
            <>
                <FontAwesomeIcon icon={faBell} />
                {visivel && 
                <div className={styles.container}>
                    {props.children}
                </div>}
            </>
        } />
    )
}