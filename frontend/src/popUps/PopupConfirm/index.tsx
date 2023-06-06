import PopUp from "../../components/PopUp";
import iconeconfirm from '../../assets/iconeConfirm.png';
import { BotaoPreenchido } from "../../components/Botoes";
import styles from './PopupConfirm.module.scss';

interface Props {
  visivel: boolean;
  onClose: () => void;
  titulo: string;
  descricao: string;
}

export default function PopupConfirm(props: Props) {
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
          handleClick={props.onClose}
          className={styles.botao}>
          OK
        </BotaoPreenchido>
      </div>
    </PopUp>
  );
}