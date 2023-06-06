import styles from './NovoUsuarioMobile.module.scss';
import GoogleIcon from "../../../components/GoogleIcon";
import { InputEscuro } from '../../../components/Inputs';
import { useEffect, useState } from 'react';
import { GrupoProps, PermissionProps, UsuarioProps } from '../../../types';
import classNames from 'classnames';
import { DropdownEscuro } from '../../../components/Dropdowns';
import { Botao, BotaoSwitch } from '../../../components/Botoes';
import PermissoesCustomizadas from '../../../components/PermissoesCustomizadasPanel';
import Grupos from '../../../services/Grupos';
import { useNavigate, useParams } from 'react-router';
import Usuarios from '../../../services/Usuarios';
import PopupCarregando from '../../../popUps/PopupCarregando';
import PopupConfirm from '../../../popUps/PopupConfirm';
import PopupErro from '../../../popUps/PopupErro';

export default function NovoUsuarioMobile() {
  const nav = useNavigate();
  const { id } = useParams();

  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [grupo, setGrupo] = useState<GrupoProps>();
  const [permsEscolhidas, setPermsEscolhidas] = useState<number[]>([]);

  const [permCustomizada, setPermCustomizada] = useState(false);
  const [perms, setPerms] = useState<PermissionProps[]>([]);
  const [grupos, setGrupos] = useState<GrupoProps[]>([]);

  const [nomeErro, setNomeErro] = useState(false);
  const [emailErro, setEmailErro] = useState(false);
  const [senhaErro, setSenhaErro] = useState(false);
  const [grupoErro, setGrupoErro] = useState(false);

  const [carregando, setCarregando] = useState(false);
  const [failGet, setFailGet] = useState(false);
  const [confirmEdit, setConfirmEdit] = useState(false);
  const [failEdit, setFailEdit] = useState(false);
  const [confirm, setConfirm] = useState(false);
  const [fail, setFail] = useState(false);

  const submit = () => {
    if ((!id && (!nome || !grupo || !email || !senha)) || id && (!nome || !grupo || !email)) {
      setNomeErro(!nome);
      setGrupoErro(!grupo);
      setEmailErro(!email);
      setSenhaErro(!id && !senha);
    } else {
      setCarregando(true);
      if (id) {
        Usuarios.editar(Number(id), {
          name: nome,
          email: email,
          isActive: true,
          roleId: grupo.id,
          permissions: permsEscolhidas
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
          password: senha,
          permissions: permsEscolhidas
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
    Grupos.getAll().then(grupos => setGrupos(grupos));
    if (id) {
      setCarregando(true);
      Usuarios.getByID(Number(id))
        .then((user: UsuarioProps) => {
          setCarregando(false);
          setNome(user.name);
          setEmail(user.email);
          setGrupo(user.role);
          setPermsEscolhidas(user.permissions.length ? 
            user.permissions.map(perm => perm.id) : 
            user.role.permissions.map(perm => perm.id));
          setPermCustomizada(user.role ? Boolean(user.permissions.length) : true);
        })
        .catch(() => {
          setCarregando(false);
          setFailGet(true);
        });
    }
  }, []);
  return (
    <>
      <section id='mobile' className={styles.container}>
        <button
          onClick={() => nav(-1)}
          className={styles['back-btn']}>
          <GoogleIcon className={styles['back-icon']}>&#xe5e0;</GoogleIcon>
          <span className={styles['back-span']}>Voltar</span>
        </button>
        <h2 className={styles.title}>{id ? 'Editar usuário' : 'Novo usuário'}</h2>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            submit();
          }}
          className={styles.form}>
          <div className={styles.row}>
            <span className={styles.label}>Nome</span>
            <InputEscuro
              className={classNames({
                [styles['input']]: true,
                [styles.erro]: nomeErro
              })}
              handleChange={(s) => setNome(s.target.value)}
              onFocus={() => setNomeErro(false)}
              valor={nome}
            />
          </div>
          <div className={styles.row}>
            <span className={styles.label}>Email</span>
            <InputEscuro
              className={classNames({
                [styles['input']]: true,
                [styles.erro]: emailErro
              })}
              handleChange={(s) => setEmail(s.target.value)}
              onFocus={() => setEmailErro(false)}
              valor={email}
              tipo='email'
            />
          </div>
          <div className={styles.row}>
            <span className={styles.label}>Senha</span>
            <InputEscuro
              className={classNames({
                [styles['input']]: true,
                [styles.erro]: senhaErro
              })}
              handleChange={(s) => setSenha(s.target.value)}
              onFocus={() => setSenhaErro(false)}
              valor={senha}
              tipo='password'
            />
          </div>
          <div className={classNames({
            [styles.row]: true,
            [styles.dropdown]: true
          })}>
            <span className={styles.label}>Grupo</span>
            <DropdownEscuro
              className={classNames({
                [styles.dropdown]: true,
                [styles.erro]: grupoErro
              })}
              itens={grupos.map(grupo => grupo.name)}
              selecionadoFst={grupo ? grupo.name : ''}
              onOpen={() => setGrupoErro(false)}
              handleSelected={(s) => {
                let grupo = grupos.find(grupo => grupo.name == s)
                setGrupo(grupo);
                if (!permCustomizada) {
                  setPermsEscolhidas(grupo.permissions.map(perm => perm.id));
                }
              }}
            />
          </div>
          <div className={styles['perm-row']}>
            <BotaoSwitch
              isActive={permCustomizada}
              handleClick={(value) => {
                setPermCustomizada(value);
                if (!value) {
                  setPermsEscolhidas(grupo.permissions.map(perm => perm.id))
                }
              }}
            />
            <span className={classNames({
              [styles['perm-label']]: true,
              [styles['perm-label-desactive']]: !permCustomizada
            })}>
              Permissões customizadas
            </span>
          </div>
          {permCustomizada && <div className={styles['perm-warning']}>
            {'[ ! ] Com permissões customizadas, o usuário não terá as permissões de seu grupo, e sim suas próprias permissões.'}
          </div>}
          {permCustomizada ?
            <PermissoesCustomizadas
              permEscolhidas={permsEscolhidas}
              addPermission={id => setPermsEscolhidas(prevState => [...prevState, id])}
              removePermission={id => setPermsEscolhidas(prevState => prevState.filter(e => e !== id))}
            /> :
            <>
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
            </>
          }
          <div className={styles.espacador} />
          <div className={styles['linha-submit']}>
            <Botao
              handleClick={() => {
                nav(-1);
              }}
              className={styles['botao-cancelar']}
              variante='contornado'>
              Cancelar
            </Botao>
            <Botao
              tipo="submit"
              className={styles['botao-criar']}
              variante='contornado'>
              {id ? 'Editar' : 'Criar'}
            </Botao>
          </div>
        </form>
      </section>
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
    </>
  );
}