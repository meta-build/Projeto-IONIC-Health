import PopUp from "../../components/PopUp";
import iconeAlerta from '../../assets/icone alerta.png';
import { BotaoPreenchido } from "../../components/Botoes";
import styles from './PopupAlerta.module.scss';
import classNames from "classnames";

interface Props {
  visivel: boolean;
  onClose: () => void;
  onConfirm: () => void;
  titulo: string;
  descricao: string;
}
export default function PopupAlerta(props: Props) {
  return (
    <PopUp
      visivel={props.visivel}
      onClose={props.onClose}
      titulo={props.titulo}
      icone={<img src={iconeAlerta} />}>
      <span className={styles.desc}>{props.descricao}</span>
      <div className={styles['botao-container']} id='desktop'>
        <BotaoPreenchido
          handleClick={props.onConfirm}
          className={classNames({
            [styles.botao]: true,
            [styles.excluir]: true
          })} >
          CONFIRMAR
        </BotaoPreenchido>
        <BotaoPreenchido
          handleClick={props.onClose}
          className={styles.botao}>
          CANCELAR
        </BotaoPreenchido>
      </div>
      <div className={classNames({
        [styles['botao-container']]: true,
        [styles['botao-container-mobile']]: true
      })} id='mobile'>
        <BotaoPreenchido
          handleClick={props.onConfirm}
          className={classNames({
            [styles.botao]: true,
            [styles.excluir]: true
          })} >
          CONFIRMAR
        </BotaoPreenchido>
        <BotaoPreenchido
          handleClick={props.onClose}
          className={styles.botao}>
          CANCELAR
        </BotaoPreenchido>
      </div>
    </PopUp>
  );
}