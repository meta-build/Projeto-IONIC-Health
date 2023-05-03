import classNames from "classnames";
import { InputPopup } from "../../components/Inputs";
import PopUp from "../../components/PopUp";
import styles from './EditarUsuario.module.scss';
import { useEffect, useState } from "react";
import { DropdownPreenchido } from "../../components/Dropdowns";
import { BotaoPopup } from "../../components/Botoes";
import Usuarios from "../../services/Usuarios";
import { EditarUsuarioProps, UsuarioProps } from "../../types";

interface Props {
  aberto: boolean;
  onClose: () => void;
  idUser: number;
}

export default function EditarUsuario(props: Props) {
  // pegar valor de cada campo
  const [nome, setNome] = useState('');
  const [grupo, setGrupo] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');

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

  const intGrupo = (grupo: string) => {
    switch (grupo) {
      case 'Administrador':
        return 1;
      case 'Solicitante':
        return 2;
      case 'Avaliador (Risco)':
        return 3;
      case 'Avaliador (Custo)':
        return 4;
      case 'Avaliador (Impacto)':
        return 5;
    }
  }

  // função chamada ao clicar em "enviar" ou apertar enter (submeter formulário)
  const submit = () => {
    const obj: EditarUsuarioProps = {
      grupoId: intGrupo(grupo)
    };

    if (nome !== '') {
      obj.name = nome;
    }
    if (email !== '') {
      obj.mail = email;
    }
    if (senha !== '') {
      obj.password = senha;
    }

    Usuarios.editar(props.idUser, obj).then(() => {
      props.onClose();
    });
  }


  useEffect(() => {
    if (props.idUser) {
      Usuarios.getByID(props.idUser).then(data => {
        setUsuario(data);
        setNome(data.name);
        setGrupo(groupStringify(data.grupoId));
        setEmail(data.mail);
        setSenha(data.password);
      })
    }
  }, [props.idUser]);
  return (
    <PopUp
      titulo={`Editar usuário ${usuario && usuario.name}`}
      visivel={props.aberto}
      onClose={props.onClose}>
      <form
        className={styles.form}
        // ao clicar em criar ou dar enter, é submetido o formulário executando a função abaixo
        onSubmit={(e) => {
          e.preventDefault();
          submit();
        }}>
        {/* cada linha é feito com div, observar estilização aplicada */}
        <div className={styles.linha}>
          {/* cada campo é feito com span, onde dentro tem label e o input */}
          <span className={classNames({
            [styles.campo]: true,
            [styles['campo-preenchido']]: true
          })}>
            <label>Nome:</label>
            {/* input possui estilização de erro caso o usuário tente enviar um formulário sem um dos campos preenchidos */}
            <InputPopup
              className={classNames({
                [styles['input-preenchido']]: true
              })}
              handleChange={(s) => setNome(s.target.value)}
              valor={nome}
            />
          </span>
          <span
            className={styles.campo}>
            <label>Grupo:</label>
            <DropdownPreenchido
              itens={['Solicitante', 'Administrador', 'Avaliador (Risco)', 'Avaliador (Impacto)', 'Avaliador (Custo)']}
              selecionadoFst={grupo}
              handleSelected={(s) => setGrupo(s)}
            />
          </span>
        </div>
        <div className={styles.linha}>
          <span className={classNames({
            [styles.campo]: true,
            [styles['campo-preenchido']]: true,
          })}>
            <label>Email:</label>
            <InputPopup
              className={classNames({
                [styles['input-preenchido']]: true
              })}
              handleChange={(s) => setEmail(s.target.value)}
              valor={email}
              // o tipo email exige uma formatação específica para email como presença do @ e sem caracteres especiais ou acentos
              tipo="email"
            />
          </span>
          <span className={classNames({
            [styles.campo]: true,
            [styles['campo-preenchido']]: true
          })}>
            <label>Senha:</label>
            <InputPopup
              className={classNames({
                [styles['input-preenchido']]: true
              })}
              handleChange={(s) => setSenha(s.target.value)}
              valor={senha}
              // tipo password censura o campo inserido
              tipo="password"
            />
          </span>
        </div>
        {/* linha especial somente para os botões, podendo ser usado para todos os popups */}
        <div className={styles['linha-submit']}>
          {/* botão não tem onclick, pois o submit já faz toda a ação de enviar o formulário. a função chamada está no onsubmit, no começo da tag form */}
          <BotaoPopup tipo="submit">
            Editar
          </BotaoPopup>
        </div>
      </form>
    </PopUp>
  )
}