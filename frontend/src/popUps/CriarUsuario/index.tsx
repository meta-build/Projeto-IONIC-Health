import classNames from "classnames";
import { InputPopup } from "../../components/Inputs";
import PopUp from "../../components/PopUp";
import styles from './CriarUsuario.module.scss';
import { useState } from "react";
import { DropdownPreenchido } from "../../components/Dropdowns";
import { BotaoPopup } from "../../components/Botoes";
import Usuarios from "../../services/Usuarios";

interface Props {
  aberto: boolean;
  onClose: () => void;
}

export default function CriarUsuario(props: Props) {
  // pegar valor de cada campo
  const [nome, setNome] = useState('');
  const [grupo, setGrupo] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');

  // se true > destacar campo em vermelho
  const [erroNome, setErroNome] = useState(false);
  const [erroGrupo, setErroGrupo] = useState(false);
  const [erroEmail, setErroEmail] = useState(false);
  const [erroSenha, setErroSenha] = useState(false);

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
    if (!nome || !grupo || !email || !senha) {
      setErroNome(!nome);
      setErroGrupo(!grupo);
      setErroEmail(!email);
      setErroSenha(!senha);
    } else {
      Usuarios.criar({
        grupoId: intGrupo(grupo),
        mail: email,
        name: nome,
        password: senha
      }).then(() => {
        props.onClose();
      });
    }
  }

  return (
    <PopUp
      titulo="Criar novo usuário"
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
            <label>
              Nome:
            </label>
            {/* input possui estilização de erro caso o usuário tente enviar um formulário sem um dos campos preenchidos */}
            <InputPopup
              className={classNames({
                [styles['input-preenchido']]: true,
                [styles.erro]: erroNome
              })}
              handleChange={(s) => setNome(s.target.value)}
              // quando com erro e o usuário clica no campo, é limpado o destaque de erro
              onFocus={() => setErroNome(false)}
              valor={nome}
            />
          </span>
          <span
            className={styles.campo}>
            <label>Grupo:</label>
            <DropdownPreenchido
              className={classNames({
                [styles.erro]: erroGrupo
              })}
              itens={['Solicitante', 'Administrador', 'Avaliador (Risco)', 'Avaliador (Impacto)', 'Avaliador (Custo)']}
              selecionadoFst=" "
              handleSelected={(s) => setGrupo(s)}
              // dropdown implementado com onopen, onde tem a mesma funcionalidade que o onclick do botão e com a mesma finalidade que o onfocus dos outros campos
              onOpen={() => setErroGrupo(false)}
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
                [styles['input-preenchido']]: true,
                [styles.erro]: erroEmail
              })}
              handleChange={(s) => setEmail(s.target.value)}
              onFocus={() => setErroEmail(false)}
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
                [styles['input-preenchido']]: true,
                [styles.erro]: erroSenha
              })}
              handleChange={(s) => setSenha(s.target.value)}
              onFocus={() => setErroSenha(false)}
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
            Criar
          </BotaoPopup>
        </div>
      </form>
    </PopUp>
  );
}