import styles from './Home.module.scss';
import { faFolder, faFile, faFileLines} from "@fortawesome/free-regular-svg-icons";
import { faPlus, faFileExport } from '@fortawesome/free-solid-svg-icons';
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
        new HomeItem('Criar Feature/Hotfix', <GoogleIcon>&#xe89c;</GoogleIcon>, '/nova-feature'),
        new HomeItem('Solicitações Recentes', <FontAwesomeIcon icon={faFile} />, '/solicitacoes/recentes'),
        new HomeItem('Solicitações em Avaliação', <GoogleIcon>&#xf801;</GoogleIcon>, '/solicitacoes/avaliacao'),
        new HomeItem('Solicitações em Produção', <GoogleIcon>&#xe9fc;</GoogleIcon>, '/solicitacoes/producao'),
        new HomeItem('Solicitações Arquivadas', <GoogleIcon>&#xE2c8;</GoogleIcon>, '/solicitacoes/arquivadas'),
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