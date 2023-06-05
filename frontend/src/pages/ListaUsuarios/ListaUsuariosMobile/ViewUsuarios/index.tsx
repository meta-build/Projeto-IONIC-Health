import styles from './ListaUsuariosMobile.module.scss';
import { useEffect, useState } from 'react';
import GoogleIcon from '../../../../components/GoogleIcon';
import { Header32 } from '../../../../components/Header';
import { InputContornado } from '../../../../components/Inputs';
import { UsuarioProps } from '../../../../types';
import { Botao } from '../../../../components/Botoes';
import { useContexto } from '../../../../context/contexto';
import ItemNome from '../../../../components/ItemNome';
import Usuarios from '../../../../services/Usuarios';
import { useNavigate } from 'react-router-dom';
import DetailUsuarios from '../DetailUsuarios';

export default function ListaUsuariosMobile(){
    const { usuario } = useContexto();
    const navigate = useNavigate();
  const nav = useNavigate();
  
    const [busca, setBusca] = useState('');
  
    const [usuarios, setUsuarios] = useState<UsuarioProps[]>([]);
    const [userSelecionado, setUserSelecionado] = useState<UsuarioProps>();

    const filtrarNome = (titulo: string) => {
        const regex = new RegExp(busca, 'i');
        return regex.test(titulo);
      }
    
      const getUsuarios = () => {
        Usuarios.getAll().then((data) => {
          setUsuarios(data.filter((user: UsuarioProps) => {
            const isActive = user.isActive;
            const notUser = user.name !== usuario.name;
            const filterPesquisa = filtrarNome(user.name);
            return notUser && filterPesquisa && isActive;
          }));
        });
      }
    
      useEffect(() => {
        getUsuarios();
      }, [busca]);

      const handleVoltar = () => {
        navigate(-1);
      };

    return(
      <>
        {!userSelecionado && <section id='mobile'>
          <div className={styles.listContainer}>
          <Header32 className={styles.titulo}>
            <button
              className={styles.botaoVoltar}
              onClick={handleVoltar}
            >
              {/* <FaArrowLeft className="icone-seta" /> */}
              <GoogleIcon className={styles['icone-seta']}>&#xe5cb;</GoogleIcon>
              <span className={styles.textoVoltar}>Voltar</span>
            </button>
            Usuários
          </Header32>
          <section className={styles.section}>
        <div className={styles.esquerda}>
          <div className={styles.inputContainer}>
            <InputContornado
              className={styles.inputPreenchimento}
              placeholder='Pesquisar solicitação...'
              icon={<GoogleIcon>&#xe8b6;</GoogleIcon>}
              handleChange={(e) => setBusca(e.target.value)}
            />
          </div>
          <div className={styles.inputContainer}>
            {usuario.permissions.find(perm => perm.id == 1) && 
            <Botao
              handleClick={() => {
                nav('/criar-usuario');
              }}
              className={styles.botao}>
              Criar usuário
            </Botao>}
          </div>
          <div
            className={styles.listContainer2}
            onClick={() => setUserSelecionado(undefined)}>
            {usuarios.length ?
              usuarios.map((user: UsuarioProps) => (
                <ItemNome
                  key={user.id}
                  nome={user.name}
                  desc={user.role.name}
                  handleClick={() => setUserSelecionado(user)}
                  isSelected={userSelecionado && user.id == userSelecionado.id}
                />
              ))
              : <span className={styles['not-found']}>Nenhum usuário encontrado.</span>}
          </div>
          </div>

          </section>
          </div>
        </section >}      
        {userSelecionado && < DetailUsuarios onBack={()=>setUserSelecionado(undefined)} userSelecionado={userSelecionado}/>}
      </>
    )
    
}