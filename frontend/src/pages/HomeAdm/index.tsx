import styles from './HomeAdm.module.scss';
import { faFile, faUser } from "@fortawesome/free-regular-svg-icons";
import BotaoIcon from "../../components/Botoes/BotaoIcon";
import { Header36 } from '../../components/Header';
import classNames from 'classnames';
import HomeItem from '../../types/HomeItem';
import { useNavigate } from 'react-router-dom';
import GoogleIcon from '../../components/GoogleIcon';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useState } from 'react';
import CriarSolicitacao from '../../popUps/CriarSolicitacao';
import { useContexto } from '../../context/contexto';

export default function HomeAdm () {
    const history = useNavigate();

    const [popup, setPopup] = useState(false);

    const itens = [
        new HomeItem('Usuários', <FontAwesomeIcon icon={faUser} />, '/usuarios'),
        new HomeItem('Solicitações', <FontAwesomeIcon icon={faFile} />, '/solicitacoes'),
    ]

    return(
        <div className={styles.container}>
            <Header36 className={styles.children}>Home</Header36>
            <div className={classNames({
                [styles['container-button']]: true,
                [styles.children]: true
            })}>
                <BotaoIcon
                className={styles['children-button']}
                handleClick={() => history(itens[1].getUrl())}
                icon={itens[1].getIcon()}
                >
                    {itens[1].getLabel()}
                </BotaoIcon>
                <BotaoIcon
                className={styles['children-button']}
                handleClick={() => history(itens[0].getUrl())}
                icon={itens[0].getIcon()}
                >
                    {itens[0].getLabel()}
                </BotaoIcon>
            </div>
            <CriarSolicitacao aberto={popup} onClose={() => setPopup(false)}/>
        </div>
    );
}