import { useNavigate } from "react-router-dom";
import GoogleIcon from "../GoogleIcon";
import styles from './Voltar.module.scss';

export default function Voltar () {
    const navigate = useNavigate();

    return(
        <button className={styles.voltar} onClick={() => navigate(-1)}>
                <GoogleIcon className={styles.iconVoltar}>&#xe5c4;</GoogleIcon> Voltar
        </button>
    )
}