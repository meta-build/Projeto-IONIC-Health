import styles from './Home.module.scss';
import { faFile } from "@fortawesome/free-regular-svg-icons";
import BotaoIcon from "../../components/BotaoIcon";
import { Header36 } from '../../components/Header';
import classNames from 'classnames';
import HomeItem from '../../types/HomeItem';
import { useNavigate } from 'react-router-dom';
import GoogleIcon from '../../components/GoogleIcon';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';


export default function Home () {
    const history = useNavigate();

    const itens = [
        new HomeItem('Criar Feature/Hotfix', <GoogleIcon>&#xe89c;</GoogleIcon>, '/nova-solicitacao'),
        new HomeItem('Solicitações', <FontAwesomeIcon icon={faFile} />, '/solicitacoes'),
    ]

    return(
        <div className={styles.container}>
            <Header36 className={styles.children}>Home</Header36>
            <div className={classNames({
                [styles['container-button']]: true,
                [styles.children]: true
            })}>
                {itens.map(item => (
                    <BotaoIcon
                    className={styles['children-button']}
                    handleClick={() => history(item.getUrl())}
                    icon={item.getIcon()}
                    >
                        {item.getLabel()}
                    </BotaoIcon>
                ))}
            </div>
        </div>
    );
}