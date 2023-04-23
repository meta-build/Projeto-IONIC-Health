
import styles from './Menu.module.scss';
import MenuSuspenso from '../MenuSuspenso';
import { faBell, faUser } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useState } from 'react';
import { faCheck } from '@fortawesome/free-solid-svg-icons';

export default function Menu () {
    const [notificacao, setNotificacao] = useState(true);

    return(
        <nav className={styles.container}>

            {/* logo */}
            <img src='https://uploads-ssl.webflow.com/60dcc4691817e11aa93685ab/636cfbef568f863947dd4951_logo-color.svg' />

            {/* espaçador */}
            <div className={styles.espacador} />

            {/* notificação, aparecer somente para solicitante */}
            <MenuSuspenso
            className={styles.icon}
            onOpen={() => setNotificacao(false)}
            icon={
                notificacao ?
                <span className={styles['icon-bolinha']}>
                        <FontAwesomeIcon icon={faBell} />
                        <span className={styles.bolinha} />
                </span> :
                <FontAwesomeIcon icon={faBell} />
            }>
                <ul className={styles['notificacao-lista']}>
                    <NotificacaoItem
                    titulo='notificação'
                    data='15/04/2023 às 15h53'
                    handleCheckClick={() => console.log('clicado')}
                    />
                </ul>
            </MenuSuspenso>

            {/* usuário */}
            <MenuSuspenso
            icon={<FontAwesomeIcon icon={faUser} />}>
                <ul className={styles['conta-lista']}>
                    <li
                    onClick={() => console.log('editar')}
                    className={styles['conta-item']}>
                        Editar conta
                    </li>
                    <li
                    onClick={() => console.log('sair')}
                    className={styles['conta-item']}>
                        Sair
                    </li>
                </ul>
            </MenuSuspenso>
        </nav>
    );
}

interface NotificacaoProps {
    titulo: string,
    data: string,
    handleCheckClick: () => void;
}

function NotificacaoItem (props: NotificacaoProps) {
    const [checkVisivel, setCheckVisivel] = useState(false);

    return(
        <li
        onMouseEnter={() => setCheckVisivel(true)}
        onMouseLeave={() => setCheckVisivel(false)}
        className={styles['notificacao-item']}>
            <div className={styles['notificacao-titulo']}>{props.titulo}</div>
            <div className={styles['notificacao-data']}>{props.data}</div>
            {checkVisivel && <FontAwesomeIcon
            icon={faCheck}
            className={styles['notificacao-fechar']}
            onClick={(e) => {
                e.stopPropagation();
                props.handleCheckClick();
            }}/>}
        </li>
    )
}