import styles from './ListaUsuarios.module.scss';
import { useEffect, useState } from 'react';
import GoogleIcon from '../../components/GoogleIcon';
import { Header32 } from '../../components/Header';
import { InputContornado } from '../../components/Inputs';
import { UsuarioProps } from '../../types';
import { Botao } from '../../components/Botoes';
import { useContexto } from '../../context/contexto';
import ItemNome from '../../components/ItemNome';
import Usuarios from '../../services/Usuarios';
import PopupAlerta from '../../popUps/PopupAlerta';
import PopupConfirm from '../../popUps/PopupConfirm';
import PopupErro from '../../popUps/PopupErro';
import PopupCarregando from '../../popUps/PopupCarregando';
import { useNavigate } from 'react-router-dom';

export default function ListaUsuarios() {
  const { usuario } = useContexto();
  const nav = useNavigate();

  const [busca, setBusca] = useState('');

  const [usuarios, setUsuarios] = useState<UsuarioProps[]>([]);
  const [userSelecionado, setUserSelecionado] = useState<UsuarioProps>();

  const [alerta, setAlerta] = useState(false);
  const [carregando, setCarregando] = useState(false);
  const [confirma, setConfirma] = useState(false);
  const [erro, setErro] = useState(false);

  const filtrarNome = (titulo: string) => {
    const regex = new RegExp(busca, 'i');
    return regex.test(titulo);
  }

  const getPermissoes = (grupo: number) => {
    switch (grupo) {
      case 1:
        return [
          'Editar solicitações',
          'Arquivar solicitações',
          'Excluir solicitações',
          'Aprovar solicitações para avaliação',
          'Aprovar solicitaçõees para produção',
          'Criar usuários',
          'Editar usuários',
          'Excluir usuários',
          'Criar grupos',
          'Editar grupos',
          'Excluir grupos'
        ];
      case 2:
        return ['Criar solicitações'];
      case 3:
        return ['Avaliar solicitações em Risco'];
      case 4:
        return ['Avaliar solicitações em Custo'];
      default:
        return ['Avaliar solicitações em Impacto'];
    }
  }

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

  const getUsuarios = () => {
    Usuarios.getAll().then((data) => {
      setUsuarios(data.filter((user: UsuarioProps) => {
        const notUser = user.id != usuario.id;
        const filterPesquisa = filtrarNome(user.name);
        return notUser && filterPesquisa;
      }));
    });
  }

  useEffect(() => {
    getUsuarios();
  }, [busca]);
  return (
    <>
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
            <Botao
            handleClick={() => {
              nav('/criar-usuario');
            }}
            className={styles.botao}>
              Criar usuário
            </Botao>
          </div>
          <div
            className={styles.listContainer}
            onClick={() => setUserSelecionado(undefined)}>
            {usuarios.length ?
              usuarios.map((user: UsuarioProps) => (
                <ItemNome
                  key={user.id}
                  nome={user.name}
                  desc={groupStringify(user.grupoId)}
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
                  <span className={styles['user-info']}>{groupStringify(userSelecionado.grupoId)}</span>
                </div>
                <div>
                  <span>Email:</span>
                  <span className={styles['user-info']}>
                    {userSelecionado.mail}
                  </span>
                </div>
              </div>
              <div className={styles['perm-container']}>
                <div>Este usuário pode:</div>
                <ul className={styles['perm-list']}>
                  {getPermissoes(userSelecionado.grupoId).map((perm, index) => (
                    <li key={index}>
                      {perm}
                    </li>
                  ))}
                </ul>
              </div>
              <div className={styles['user-espacador']}></div>
              <div className={styles['user-botoes']}>
                <Botao className={styles.botao}>
                  Editar
                </Botao>
                <Botao
                  className={styles.botao}
                  handleClick={() => setAlerta(true)}>
                  Excluir
                </Botao>
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
            Usuarios.deletar(userSelecionado.id).then(() => {
              setCarregando(false);
              setConfirma(true);
              getUsuarios();
            }).catch(() => {
              setCarregando(false);
              setErro(true);
            })
          }}
        />
        <PopupConfirm
          visivel={confirma}
          onClose={() => setConfirma(false)}
          titulo='Concluído'
          descricao={`Usuário ${userSelecionado.name} excluído com sucesso.`}
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
      </>}
    </>
  );
}