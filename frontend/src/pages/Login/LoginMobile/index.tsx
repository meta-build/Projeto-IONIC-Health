import { useEffect, useState } from "react";
import { useContexto } from "../../../context/contexto";
import { useNavigate } from "react-router-dom";
import Carregando from "../../Carregando";
import { Botao } from "../../../components/Botoes";
import { Header32 } from "../../../components/Header";
import { InputContornado } from "../../../components/Inputs";
import Usuarios from "../../../services/Usuarios";
import api from "../../../services/api";
import styles from './LoginMobile.module.scss';

export default function LoginMobile(){
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
  
    const [erro, setErro] = useState(false);
  
    const [carregando, setCarregando] = useState(true);
  
    const { setUsuario } = useContexto();
  
    const nav = useNavigate();

    const logar = () => {
        if (email && senha) {
          Usuarios.login({ email: email, password: senha })
            .then(data => {
              const { accessToken } = data;
              console.log(accessToken)
              api.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;
              setUsuario(data);
              sessionStorage.setItem('email', email);
              sessionStorage.setItem('password', senha);
              setCarregando(false);
              nav('/home');
            })
            .catch(() => {
              setErro(true);
            })
        } else {
          setErro(true);
        }
      };
    
      useEffect(() => {
        if (sessionStorage.length > 0) {
          const { email, password } = sessionStorage;
          Usuarios.login({ email, password })
            .then(data => {
              const { accessToken } = data;
              api.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;
              setUsuario(data);
              sessionStorage.setItem('email', email);
              sessionStorage.setItem('password', password);
              nav('/home');
            });
        }
        setCarregando(false);
      }, []);

    return(
        <section id='mobile'>
            {carregando ?
        <Carregando /> :
        <div className={styles.container}>
          <img src='https://uploads-ssl.webflow.com/60dcc4691817e11aa93685ab/636cfbef568f863947dd4951_logo-color.svg' />
          <form
            onSubmit={(e) => {
              e.preventDefault();
              logar();
            }}
            className={styles.form}>
            <Header32 className={styles.titulo}>
              Login
            </Header32>
            <InputContornado
              placeholder="Email"
              tipo='email'
              handleChange={(e) => setEmail(e.target.value)}
              className={styles.input}
            />
            <InputContornado
              placeholder="Senha"
              tipo='password'
              handleChange={(e) => setSenha(e.target.value)}
              className={styles.input}
            />
            {erro &&
              <span className={styles.aviso}>
                Email ou senha inválidos!
              </span>
            }
            <Botao
              variante='preenchido'
              className={styles.botao}
              tipo='submit'>
              Entrar
            </Botao>
          </form>
        </div>
      }
            
        </section>
    )
}