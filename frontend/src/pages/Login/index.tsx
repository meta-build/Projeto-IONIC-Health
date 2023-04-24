import styles from './Login.module.scss';
import { InputContornado } from "../../components/Inputs";
import { Header32 } from '../../components/Header';
import { Botao } from '../../components/Botoes';
import { useEffect, useState } from 'react';
import { useContexto } from '../../context/contexto';
import { useNavigate } from 'react-router-dom';
import Usuarios from '../../services/Usuarios';
import Usuario from '../../types/Usuario';
import api from '../../services/api';

export default function Login() {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');

  const [erro, setErro] = useState(false);

  const {usuario, setUsuario} = useContexto();

  const nav = useNavigate();

  const logar = () => {
    if (email && senha) {
      Usuarios.login({mail: email, password: senha})
      .then(data => {
        console.log(data)
        if(data.error) {
          setErro(true);
        } else {
          const {id, grupoId, token} = data;
          api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
          setUsuario(new Usuario(id, token, grupoId))
          sessionStorage.setItem('id', `${id}`)
          sessionStorage.setItem('token', token)
          sessionStorage.setItem('grupo', `${grupoId}`)
          nav('/home');
        }
      })
    } else {
      setErro(true);
    }
  };

  useEffect(() => {
    if (sessionStorage.length > 0) {
      const {id, token, grupo} = sessionStorage;
      console.log(id, token, grupo);
      setUsuario(new Usuario(id, token, grupo));
      api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      nav('home');
    }
  }, [])
  
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
          Entrar
        </Botao>
      </form>
    </div>
  );
}