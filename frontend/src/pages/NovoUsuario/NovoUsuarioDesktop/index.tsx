import { ChangeEvent, useEffect, useState } from 'react';
import styles from './NovoUsuario.module.scss';
import Usuarios from '../../../services/Usuarios';
import classNames from 'classnames';
import { Header32 } from '../../../components/Header';
import InputEscuro from '../../../components/Inputs/InputEscuro';
import DropdownEscuro from '../../../components/Dropdowns/DropdownEscuro';
import { Aba, Botao, BotaoSwitch } from '../../../components/Botoes';
import PopupConfirm from '../../../popUps/PopupConfirm';
import { useNavigate, useParams } from 'react-router-dom';
import PopupErro from '../../../popUps/PopupErro';
import PopupCarregando from '../../../popUps/PopupCarregando';
import { GrupoProps, PermissionProps, UsuarioProps } from '../../../types';
import Grupos from '../../../services/Grupos';
import Permissoes from '../../../services/Permissoes';

export default function NovoUsuarioDesktop() {
  const nav = useNavigate();
  const { id } = useParams();

  const [aba, setAba] = useState('Solicitações');
  const [perms, setPerms] = useState<PermissionProps[]>([]);

  // pegar valor de cada campo
  const [nome, setNome] = useState('');
  const [grupo, setGrupo] = useState<GrupoProps>();
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');

  const [permsCustomizadas, setPermsCustomizadas] = useState(false);
  const [permsEscolhidas, setPermsEscolhidas] = useState<number[]>([]);

  const [grupos, setGrupos] = useState<GrupoProps[]>([]);
  // se true > destacar campo em vermelho
  const [erroNome, setErroNome] = useState(false);
  const [erroGrupo, setErroGrupo] = useState(false);
  const [erroEmail, setErroEmail] = useState(false);
  const [erroSenha, setErroSenha] = useState(false);

  const [confirm, setConfirm] = useState(false);
  const [fail, setFail] = useState(false);
  const [carregando, setCarregando] = useState(false);

  const [confirmEdit, setConfirmEdit] = useState(false);
  const [failEdit, setFailEdit] = useState(false);

  const [failGet, setFailGet] = useState(false);

  const submit = () => {
    if ((!id && (!nome || !grupo || !email || !senha)) || id && (!nome || !grupo || !email)) {
      setErroNome(!nome);
      setErroGrupo(!grupo);
      setErroEmail(!email);
      setErroSenha(!senha);
    } else {
      setCarregando(true);
      if (id) {
        Usuarios.editar(Number(id), {
          name: nome,
          email: email,
          isActive: true,
          roleId: grupo.id
        }).then(() => {
          setCarregando(false);
          setConfirmEdit(true);
        }).catch(() => {
          setCarregando(false);
          setFailEdit(true);
        });
      } else {
        Usuarios.criar({
          roleId: grupo.id,
          email: email,
          name: nome,
          password: senha
        }).then(() => {
          setCarregando(false);
          setConfirm(true);
        }).catch(() => {
          setCarregando(false);
          setFail(true);
        });
      }
    }
  }

  useEffect(() => {
    Permissoes.getAll().then(perms => {
      setPerms(perms);
    });
    if (id) {
      setCarregando(true);
      Usuarios.getByID(Number(id))
        .then((user: UsuarioProps) => {
          setCarregando(false);
          setNome(user.name);
          setEmail(user.email);
          setGrupo(user.role);
          setPermsEscolhidas(user.role.permissions.map(perm => perm.id));
        })
        .catch(() => {
          setCarregando(false);
          setFailGet(true);
        });
    }
    Grupos.getAll().then(grupos => setGrupos(grupos))
  }, []);

  return (
    <section id='desktop'>
      <Header32 className={styles.header}>
        {id ? 'Editar ' : 'Novo '} Usuário
      </Header32>
      <div className={styles.quadrado}>
        <form
          className={styles.forms}
          onSubmit={(e) => {
            e.preventDefault();
            submit();
          }}>
          <div className={styles.linha}>
            <span className={classNames({
              [styles.campo]: true,
              [styles['campo-preenchido']]: true
            })}>
              <label>Nome:</label>
              <InputEscuro
                className={classNames({
                  [styles['input-preenchido']]: true,
                  [styles.erro]: erroNome
                })}
                handleChange={(s) => setNome(s.target.value)}
                onFocus={() => setErroNome}
                valor={nome}
              />
            </span>
            <span className={classNames({
              [styles.campo]: true,
            })}>
              <label>Grupo:</label>
              <DropdownEscuro
                className={classNames({
                  [styles.erro]: erroGrupo
                })}
                itens={grupos.map(grupo => grupo.name)}
                selecionadoFst={grupo ? grupo.name : ''}
                handleSelected={(s) => {
                  let grupo = grupos.find(grupo => grupo.name == s)
                  setGrupo(grupo);
                  if(!permsCustomizadas) {
                    setPermsEscolhidas(grupo.permissions.map(perm => perm.id));
                  }
                }}
                onOpen={() => setErroGrupo(false)}
              />
            </span>
          </div>
          <div>
            <div className={styles.campo}>
              <span className={classNames({
                [styles.campo]: true,
                [styles['campo-preenchido']]: true,
              })}>
                <label>Email:</label>
                <InputEscuro
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
            </div>
          </div>
          {!id &&
            <div>
              <div className={styles.campo}>
                <span className={classNames({
                  [styles.campo]: true,
                  [styles['campo-preenchido']]: true
                })}>
                  <label>Senha:</label>
                  <InputEscuro
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
            </div>}

          <div className={styles['perm-row']}>
            <BotaoSwitch
              isActive={permsCustomizadas}
              handleClick={(value) => {
                setPermsCustomizadas(value);
                if (!value) {
                  setPermsEscolhidas(grupo.permissions.map(perm => perm.id))
                }
              }}
            />
            <span className={classNames({
              [styles['perm-label']]: true,
              [styles['perm-label-desactive']]: !permsCustomizadas
            })}>
              Permissões customizadas
            </span>
          </div>
          {permsCustomizadas && <div className={styles['perm-warning']}>
            {'[ ! ] Com permissões customizadas, o usuário não terá as permissões de seu grupo, e sim suas próprias permissões.'}
          </div>}

          {permsCustomizadas ?
            <>
              <div className={styles['aba-container']}>
                <Aba
                  className={styles.aba}
                  handleClick={() => setAba('Solicitações')}
                  isActive={aba == 'Solicitações'}>
                  Solicitações
                </Aba>
                <Aba
                  className={styles.aba}
                  handleClick={() => setAba('Usuários')}
                  isActive={aba == 'Usuários'}>
                  Usuários
                </Aba>
                <Aba
                  className={styles.aba}
                  handleClick={() => setAba('Grupos')}
                  isActive={aba == 'Grupos'}>
                  Grupos
                </Aba>
              </div>
              <ul className={styles.perms}>
                {perms && perms.filter(perm => {
                  if (aba == 'Solicitações') {
                    return perm.humanizedEntity == 'Solicitações' || perm.humanizedEntity == 'Avaliações'
                  } else {
                    return perm.humanizedEntity == aba;
                  }
                })
                  .map(perm => (
                    <li className={styles['perms-item']}>
                      <BotaoSwitch
                        isActive={permsEscolhidas.includes(perm.id)}
                        handleClick={(value) => {
                          if (value) {
                            setPermsEscolhidas(prevState => [...prevState, perm.id])
                          } else {
                            setPermsEscolhidas(prevState => prevState.filter(e => e !== perm.id))
                          }
                        }} />
                      <div className={classNames({
                        [styles.desactive]: !permsEscolhidas.includes(perm.id)
                      })}>{perm.humanizedPermissionName}</div>
                    </li>
                  ))}
              </ul>
            </>
            : <div>
              {grupo ?
                <>
                  <label>Este usuario poderá: </label>
                  <ul className={styles.lista}>
                    {grupo.permissions.map(perm => (
                      <li key={perm.id}>
                        {perm.humanizedPermissionName}
                      </li>
                    ))}
                  </ul>
                </>
                :
                <span>Escolha o grupo para visualizar suas permissões.</span>
              }
            </div>}
          <div className={styles.espacador} />
          <div className={
            styles['linha-submit']
          }>
            <span className={styles.linha2}>
              <Botao
                handleClick={() => {
                  nav(-1);
                }}
                className={styles.botaoCancelar}
                variante='contornado'>
                Cancelar
              </Botao>
              <Botao
                tipo="submit"
                className={styles.botaoCriar}
                variante='contornado'>
                {id ? 'Editar' : 'Criar'}
              </Botao>
            </span>
          </div>
        </form>
      </div>
      <PopupCarregando visivel={carregando} />
      {!id &&
        <>
          <PopupConfirm
            visivel={confirm}
            onClose={() => {
              setConfirm(false);
              nav('/usuarios');
            }}
            titulo='Usuário criado com sucesso'
            descricao={`Usuário ${nome} criado com sucesso.`} />
          <PopupErro
            visivel={fail}
            onClose={() => setFail(false)}
            titulo='Erro de criação de usuário'
            descricao='Não foi possível criar o usuário devido a um erro interno do servidor. Tente novamente mais tarde.' />
        </>}
      {id &&
        <>
          <PopupConfirm
            visivel={confirmEdit}
            onClose={() => {
              setConfirmEdit(false);
              nav('/usuarios');
            }}
            titulo='Usuário editado com sucesso'
            descricao={`Usuário ${nome} editado com sucesso.`} />
          <PopupErro
            visivel={failEdit}
            onClose={() => setFailEdit(false)}
            titulo='Erro de edição de usuário'
            descricao='Não foi possível editar o usuário devido a um erro interno do servidor. Tente novamente mais tarde.' />
          <PopupErro
            visivel={failGet}
            onClose={() => {
              setFailGet(false);
              nav(-1);
            }}
            titulo='Erro ao abrir edição de usuário'
            descricao='Não será possível editar o usuário devido a um erro interno do servidor. Tente novamente mais tarde.' />
        </>
      }
    </section>
  );
}
