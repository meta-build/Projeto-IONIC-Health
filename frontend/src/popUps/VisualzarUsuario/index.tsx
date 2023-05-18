import classNames from "classnames";
import PopUp from "../../components/PopUp";
import styles from './VisualizarUsuario.module.scss';
import { useEffect, useState } from "react";
import { BotaoPreenchido } from "../../components/Botoes";
import {
  EditarUsuario,
  ConfirmarExclusaoUsuario
} from '../';
import { UsuarioProps } from "../../types";
import Usuarios from "../../services/Usuarios";

interface Props {
  aberto: boolean;
  onClose: () => void;
  idUser: number;
}

export default function VisualizarUsuario(props: Props) {
  const [popupEditar, setPopupEditar] = useState(false);
  const [popupExcluir, setPopupExcluir] = useState(false);

  const [usuario, setUsuario] = useState<UsuarioProps>();

  const groupStringify = (id: number) => {
    switch (id) {
      case 1:
        return 'Administrador';
      case 2:
        return 'Solicitante';
      case 3:
        return 'Avaliador (Risco)';
      case 4:
        return 'Avaliador (Custo)';
      default:
        return 'Avaliador (Impacto)';
    }
  }

  useEffect(() => {
    if (props.idUser) {
      Usuarios.getByID(props.idUser).then(data => {
        setUsuario(data);
      });
    }
  }, [props.idUser, popupEditar]);
  return (
    <PopUp
      titulo={`Usuário ${usuario && usuario.name}`}
      visivel={props.aberto}
      onClose={props.onClose}>
      <div className={styles.form}>
        {/* cada linha é feito com div, observar estilização aplicada */}
        <div className={styles.linha}>
          {/* cada campo é feito com span, onde dentro tem label e o input */}
          <span className={classNames({
            [styles.campo]: true,
            [styles['campo-preenchido']]: true
          })}>
            <label>Email:</label>
            {/* input possui estilização de erro caso o usuário tente enviar um formulário sem um dos campos preenchidos */}
            <span>{usuario && usuario.mail}</span>
          </span>
          <span className={classNames({
            [styles.campo]: true
          })}>
            <label>Grupo</label>
            {/* input possui estilização de erro caso o usuário tente enviar um formulário sem um dos campos preenchidos */}
            {usuario && <span>{groupStringify(usuario.grupoId)}</span>}
          </span>
        </div>
        {/* linha especial somente para os botões, podendo ser usado para todos os popups */}
        <div className={styles['linha-submit']}>
          {/* botão não tem onclick, pois o submit já faz toda a ação de enviar o formulário. a função chamada está no onsubmit, no começo da tag form */}
          <BotaoPreenchido
            handleClick={() => {
              setPopupExcluir(true);
            }}
            className={styles.botao}>
            Excluir
          </BotaoPreenchido>
          <BotaoPreenchido
            handleClick={() => {
              setPopupEditar(true);
            }}
            className={styles.botao}>
            Editar
          </BotaoPreenchido>
        </div>
      </div>
      <EditarUsuario
        idUser={props.idUser}
        aberto={popupEditar}
        onClose={() => setPopupEditar(false)}
      />
      <ConfirmarExclusaoUsuario
        idUser={props.idUser}
        onConfirm={props.onClose}
        aberto={popupExcluir}
        onClose={() => setPopupExcluir(false)}
      />
    </PopUp>
  )
}