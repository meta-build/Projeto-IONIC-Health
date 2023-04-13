import styles from './Login.module.scss';
import { InputContornado } from "../../components/Inputs";
import { Header32 } from '../../components/Header';
import { Botao } from '../../components/Botoes';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Login() {
  const history = useNavigate();


  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');

  const [erro, setErro] = useState(false);

  const logar = () => {
    if (email !== '' && senha !== '') {
      console.log({
        email, senha
      });
      history('/home');
    } else {
      setErro(true);
    }
  };

  return (
    <div className={styles.container}>

      <img src='https://uploads-ssl.webflow.com/60dcc4691817e11aa93685ab/636cfbef568f863947dd4951_logo-color.svg' />
      <form
      onSubmit={(e) => {
        e.preventDefault();
        logar();
      }}
      className={styles.form}>
        <Header32 className={styles.titulo}>Login</Header32>

        <InputContornado
        placeholder="Email"
        tipo='email'
        handleChange={(e) => setEmail(e.target.value)}
        className={styles.input} />

        <InputContornado
        placeholder="Senha"
        tipo='password'
        handleChange={(e) => setSenha(e.target.value)}
        className={styles.input} />

        {erro &&
          <span className={styles.aviso}>Email ou senha inválidos!</span>
        }

        <Botao      
        variante='preenchido'
        className={styles.botao}
        tipo='submit'>
          Teste
        </Botao>
      </form>
    </div>
  );
}