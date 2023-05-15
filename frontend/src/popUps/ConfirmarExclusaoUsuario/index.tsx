import { useEffect, useState } from "react";
import PopUp from "../../components/PopUp";
import { BotaoPreenchido } from "../../components/Botoes";
import styles from './ConfirmarExclusaoUsuario.module.scss';
import classNames from "classnames";
import Usuarios from "../../services/Usuarios";
import { UsuarioProps } from "../../types";

interface Props {
  aberto: boolean;
  onClose: () => void;
  onConfirm: () => void;
  idUser: number;
}

export default function ConfirmarExclusaoUsuario(props: Props) {
  const [usuario, setUsuario] = useState<UsuarioProps>();

  useEffect(() => {
    if (props.idUser) {
      Usuarios.getByID(props.idUser).then(data => {
        setUsuario(data);
      })
    }
  }, [props.idUser]);
  return (
    <PopUp
      visivel={props.aberto}
      onClose={props.onClose}
      titulo={`Alerta EXCLUSÃO de Usuário`}>
      <span className={styles.aviso}>
        Após a exlusão, a ação não pode ser desfeita. Tem certeza em excluir o usuário {usuario && usuario.name}?
      </span>
      <div className={styles.botoes}>
        <BotaoPreenchido
          handleClick={() => {
            Usuarios.deletar(usuario.id).then(() => {
              props.onConfirm();
              props.onClose();
            })
          }}
          className={classNames({
            [styles.botao]: true,
            [styles.excluir]: true
          })}>
          EXCLUIR
        </BotaoPreenchido>
        <BotaoPreenchido
          handleClick={props.onClose}
          className={styles.botao}>
          CANCELAR
        </BotaoPreenchido>
      </div>
    </PopUp>
  )
}