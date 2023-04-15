
import { useNavigate } from 'react-router-dom';
import { useContexto } from '../../context/contexto';
import styles from './Menu.module.scss';

export default function Menu () {
    const history = useNavigate();

    const {token, setToken} = useContexto(); 

    const sair = () => {
        setToken('');
        sessionStorage.removeItem('token');
        history('/');
    }

    return(
        <nav className={styles.container}>
            <img src='https://uploads-ssl.webflow.com/60dcc4691817e11aa93685ab/636cfbef568f863947dd4951_logo-color.svg' />
        </nav>
    );
}