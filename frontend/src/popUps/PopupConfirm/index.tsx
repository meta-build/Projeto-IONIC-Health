import PopUp from "../../components/PopUp";
import iconeconfirm from '../../assets/IconeConfirm.png';
import { BotaoPreenchido } from "../../components/Botoes";
import styles from './PopupConfirm.module.scss';
import classNames from "classnames";


interface Props {
    visivel: boolean;
    onClose: () => void;
    onConfirm: () => void;
    titulo: string;
    descricao: string;

}


export default function PopupConfirm (props:Props) {
    return (
    <PopUp
    visivel={props.visivel}
    onClose={props.onClose}
    titulo={props.titulo}
    icone={<img src={iconeconfirm} />}
    >
        <span className={styles.desc}>{props.descricao}</span>
        <div className={styles['botao-container']}>

          <BotaoPreenchido
           handleClick={props.onConfirm}
            className={classNames({
              [styles.botao]: true,
              [styles.excluir]: true

            })}
          >

            OK
          </BotaoPreenchido>
        </div>

    </PopUp>
    
    
    );
}