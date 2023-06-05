import classNames from "classnames";
import { InputPopup } from "../../components/Inputs";
import PopUp from "../../components/PopUp";
import styles from './EditarConta.module.scss';
import { useEffect, useState } from "react";
import { BotaoPopup } from "../../components/Botoes";
import Usuarios from "../../services/Usuarios";
import { EditarUsuarioProps } from "../../types";
import PopupConfirm from "../PopupConfirm";
import PopupErro from "../PopupErro";
import Carregando from "../../pages/Carregando";
import PopupCarregando from "../PopupCarregando";

interface Props {
  aberto: boolean;
  onClose: () => void;
  idUser: number;
}

export default function EditarConta(props: Props) {
  // pegar valor de cada campo
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');

  const [carregando, setCarregando] = useState(false);
  const [sucesso, setSucesso] = useState(false);
  const [falha, setFalha] = useState(false);


  // função chamada ao clicar em "enviar" ou apertar enter (submeter formulário)
  const submit = () => {
    const obj: EditarUsuarioProps = {};
    if (email !== '') {
      obj.email = email;
    }
    if (senha !== '') {
      obj.password = senha;
    }
    setCarregando(true);
    Usuarios.editar(props.idUser, obj)
    .then(() => {
        setCarregando(false);
        setSucesso(true);
      })
      .catch(() => {
        setCarregando(false);
        setFalha(true);
      })
  }

  useEffect(() => {
    if (props.idUser) {
      Usuarios.getByID(props.idUser).then(data => {
        setEmail(data.email);
      });
    }
  }, [props.idUser]);
  return (
    <>
      <PopupCarregando visivel={carregando} />
      <PopUp
        titulo={`Editar conta`}
        visivel={props.aberto}
        onClose={props.onClose}>
        <form
          className={styles.form}
          // ao clicar em criar ou dar enter, é submetido o formulário executando a função abaixo
          onSubmit={(e) => {
            e.preventDefault();
            submit();
          }}>
          <div className={styles.linha} id='desktop'>
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
          <div 
          className={styles['linha-mobile']} 
          id='mobile'>
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
      <PopupConfirm
      titulo="Editado com sucesso!"
      descricao="Seu email/senha foi editado com sucesso"
      visivel={sucesso}
      onClose={() => {
        setSucesso(false);
        props.onClose();
      }} />
      <PopupErro
      titulo="Falha ao editar"
      descricao="Não foi possível editar email/senha por conta de um erro no servidor. Tente novamente mais tarde."
      onClose={() => {
        setFalha(false);
      }}
      visivel={falha} />
    </>
  )
}