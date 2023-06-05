import styles from './ListaUsuariosDesktop.module.scss';
import { useEffect, useState } from 'react';
import GoogleIcon from '../../../components/GoogleIcon';
import { Header32 } from '../../../components/Header';
import { InputContornado } from '../../../components/Inputs';
import { UsuarioProps } from '../../../types';
import { Botao } from '../../../components/Botoes';
import { useContexto } from '../../../context/contexto';
import ItemNome from '../../../components/ItemNome';
import Usuarios from '../../../services/Usuarios';
import PopupAlerta from '../../../popUps/PopupAlerta';
import PopupConfirm from '../../../popUps/PopupConfirm';
import PopupErro from '../../../popUps/PopupErro';
import PopupCarregando from '../../../popUps/PopupCarregando';
import { useNavigate } from 'react-router-dom';

export default function ListaUsuariosDesktop() {
  const { usuario } = useContexto();
  const nav = useNavigate();

  const [busca, setBusca] = useState('');

  const [usuarios, setUsuarios] = useState<UsuarioProps[]>([]);
  const [userSelecionado, setUserSelecionado] = useState<UsuarioProps>();

  const [alerta, setAlerta] = useState(false);
  const [carregando, setCarregando] = useState(false);
  const [confirma, setConfirma] = useState(false);
  const [erro, setErro] = useState(false);

  const [carregandoLista, setCarregandoLista] = useState(true);

  const filtrarNome = (titulo: string) => {
    const regex = new RegExp(busca, 'i');
    return regex.test(titulo);
  }

  const getUsuarios = () => {
    Usuarios.getAll().then((data) => {
      setCarregandoLista(false);
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
  return (
    <section id='desktop'>
      <Header32 className={styles.titulo}>
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
            className={styles.listContainer}
            onClick={() => setUserSelecionado(undefined)}>
            {carregando ?
              <div
                className={styles.loading}>
                <GoogleIcon>&#xe86a;</GoogleIcon>
              </div>
              :
              usuarios.length ?
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

        <div className={styles.direita}>
          {userSelecionado ?
            <div className={styles['user-container']}>
              <h2 className={styles['user-titulo']}>
                {userSelecionado.name}
              </h2>
              <div className={styles['user-info-container']}>
                <div>
                  <span>Grupo:</span>
                  <span className={styles['user-info']}>{userSelecionado.role.name}</span>
                </div>
                <div>
                  <span>Email:</span>
                  <span className={styles['user-info']}>
                    {userSelecionado.email}
                  </span>
                </div>
              </div>
              <div className={styles['perm-container']}>
                <div>Este usuário pode:</div>
                <ul className={styles['perm-list']}>
                  {userSelecionado.role.permissions.map((perm) => (
                    <li key={perm.id}>
                      {perm.humanizedPermissionName}
                    </li>
                  ))}
                </ul>
              </div>
              <div className={styles['user-espacador']}></div>
              <div className={styles['user-botoes']}>
                {usuario.permissions.find(perm => perm.id == 2) &&
                  <Botao
                    handleClick={() => {
                      nav(`/editar-usuario/${userSelecionado.id}`)
                    }}
                    className={styles.botao}>
                    Editar
                  </Botao>}
                {usuario.permissions.find(perm => perm.id == 3) &&
                  <Botao
                    className={styles.botao}
                    handleClick={() => setAlerta(true)}>
                    Excluir
                  </Botao>}
              </div>
            </div>
            : <span className={styles['not-found']}>
              Nenhum usuario selecionado. Clique em uma deles na lista ao lado.
            </span>}
        </div>
      </section>
      {userSelecionado && <>
        <PopupAlerta
          visivel={alerta}
          onClose={() => setAlerta(false)}
          titulo='Exclusão de usuário'
          descricao={`Confirma a exclusão do usuário ${userSelecionado.name}?`}
          onConfirm={() => {
            setAlerta(false);
            setCarregando(true);
            Usuarios.editar(userSelecionado.id, {
              email: userSelecionado.email,
              name: userSelecionado.name,
              roleId: userSelecionado.role.id,
              isActive: false
            }).then(() => {
              setCarregando(false);
              setConfirma(true);
              setUserSelecionado(undefined);
              getUsuarios();
            }).catch(() => {
              setCarregando(false);
              setErro(true);
            })
          }}
        />
      </>}
      <PopupConfirm
        visivel={confirma}
        onClose={() => setConfirma(false)}
        titulo='Concluído'
        descricao={`Usuário excluído com sucesso.`}
      />
      <PopupErro
        visivel={erro}
        onClose={() => setErro(false)}
        titulo='Erro ao excluir usuário'
        descricao='Não foi possível excluir o usuário devido à um erro interno do servidor. Tente novamente mais tarde.'
      />
      <PopupCarregando
        visivel={carregando}
      />
    </section>
  );
}