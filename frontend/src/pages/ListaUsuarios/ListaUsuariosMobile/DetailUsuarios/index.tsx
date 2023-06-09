import styles from "./DetailUsuarios.module.scss"
import { useEffect, useState } from 'react';
import { UsuarioProps } from '../../../../types';
import { useContexto } from '../../../../context/contexto';
import Usuarios from '../../../../services/Usuarios';
import PopupAlerta from '../../../../popUps/PopupAlerta';
import PopupConfirm from '../../../../popUps/PopupConfirm';
import PopupErro from '../../../../popUps/PopupErro';
import PopupCarregando from '../../../../popUps/PopupCarregando';
import { useNavigate } from 'react-router-dom';
import { DropdownOpcoes } from "../../../../components/Dropdowns";
import GoogleIcon from "../../../../components/GoogleIcon";

interface Props {
  userSelecionado: UsuarioProps;
  onBack: () => void;
}

interface ItemProps {
  label: string;
  onClick: () => void;
}



export default function DetailUsuarios({ userSelecionado, onBack }: Props) {

  const handleVoltar = () => {
    onBack();
  }
  const { usuario } = useContexto();
  const nav = useNavigate();

  const [busca, setBusca] = useState('');

  const [usuarios, setUsuarios] = useState<UsuarioProps[]>([]);


  const [alerta, setAlerta] = useState(false);
  const [carregando, setCarregando] = useState(false);
  const [confirma, setConfirma] = useState(false);
  const [erro, setErro] = useState(false);

  const botoes: ItemProps[] = [
    usuario.permissions.find(perm => perm.id == 5) ?
      { label: 'Editar', onClick: () => nav(`/editar-usuario/${userSelecionado.id}`) } : null,
    usuario.permissions.find(perm => perm.id == 6) ?
      { label: 'Excluir', onClick: () => setAlerta(true) } : null

  ].filter(Boolean) as ItemProps[];

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

  return (
    <section id='mobile'>
      <div className={styles.container}>

        <section className={styles.section}>
          <div className={styles.direita}>

            <div className={styles['user-container']}>
              <button
                onClick={handleVoltar}
                className={styles.botaoVoltar}
              >
                <GoogleIcon className={styles['icone-seta']}>&#xe5cb;</GoogleIcon>
                <span className={styles.textoVoltar}>Voltar</span>
              </button>

              <h2 className={styles['user-titulo']}>
                {userSelecionado.name}
              </h2>

              {userSelecionado ?
                <div className={styles['user-container']}>

                  <div className={styles['user-info-container']}>
                    <div>
                      <span>Grupo:</span>
                      <span className={styles['user-info']}>
                        {userSelecionado.role ?
                        userSelecionado.role.name : 'Sem grupo'}</span>
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
                      {userSelecionado.permissions.length ?
                      userSelecionado.permissions.map((perm) => (
                        <li key={perm.id}>
                          {perm.humanizedPermissionName}
                        </li>
                      )) :
                      userSelecionado.role.permissions.map((perm) => (
                        <li key={perm.id}>
                          {perm.humanizedPermissionName}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className={styles['user-espacador']}></div>
                  <div className={styles['user-botoes']}>
                    <DropdownOpcoes
                      options={[
                        {
                          label: 'Editar',
                          onClick: () => {
                            nav(`/editar-usuario/${userSelecionado.id}`)
                          }
                        },
                        {
                          label: 'Excluir',
                          onClick: () => {
                            setAlerta(true)
                          }
                        },
                      ]}
                    />
                  </div>
                </div>
                : <span className={styles['not-found']}>
                </span>}
            </div>
          </div>
        </section>
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
              roleId: userSelecionado.role ? userSelecionado.role.id : undefined,
              isActive: false
            }).then(() => {
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
      </div>
    </section>

  )
}