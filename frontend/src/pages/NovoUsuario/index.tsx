import { ChangeEvent, useEffect, useState } from 'react';
import styles from './NovoUsuario.module.scss';
import Usuarios from '../../services/Usuarios';
import classNames from 'classnames';
import { Header32 } from '../../components/Header';
import InputEscuro from '../../components/Inputs/InputEscuro';
import DropdownEscuro from '../../components/Dropdowns/DropdownEscuro';
import { Botao } from '../../components/Botoes';
import PopupConfirm from '../../popUps/PopupConfirm';
import { useNavigate, useParams } from 'react-router-dom';
import PopupErro from '../../popUps/PopupErro';
import PopupCarregando from '../../popUps/PopupCarregando';
import { GrupoProps, UsuarioProps } from '../../types';
import Grupos from '../../services/Grupos';

export default function NovoUsuario() {
  const nav = useNavigate();
  const { id } = useParams();

  // pegar valor de cada campo
  const [nome, setNome] = useState('');
  const [grupo, setGrupo] = useState<GrupoProps>();
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  

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

  const strGrupo = (grupo: number) => {
    switch (grupo) {
      case 1:
        return 'Administrador';
      case 2:
        return 'Solicitante';
      case 3:
        return 'Avaliador (Risco)';
      case 4:
        return 'Avaliador (Custo)';
      case 5:
        return 'Avaliador (Impacto)';
    }
  }

  const submit = () => {
    if (!nome || !grupo || !email || !senha) {
      setErroNome(!nome);
      setErroGrupo(!grupo);
      setErroEmail(!email);
      setErroSenha(!senha);
    } else {
      setCarregando(true);
      if (id) {
        Usuarios.editar(Number(id), {
          email: email,
          name: nome
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
    if (id) {
      setCarregando(true);
      Usuarios.getByID(Number(id))
        .then((user: UsuarioProps) => {
          setCarregando(false);
          setNome(user.name);
          setEmail(user.email);
        })
        .catch(() => {
          setCarregando(false);
          setFailGet(true);
        });
    }
    Grupos.getAll().then(grupos => setGrupos(grupos))
  }, []);

  return (
    <>
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
                handleSelected={(s) => setGrupo(grupos.find(grupo => grupo.name == s))}
                // dropdown implementado com onopen, onde tem a mesma funcionalidade que o onclick do botão e com a mesma finalidade que o onfocus dos outros campos
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
          </div>

          <div>
            <label>Este usuario poderá: </label>
            <ul className={styles.lista}>
              {grupo ? 
              grupo.permissions.map(perm => (
                <li key={perm.id}>
                  {perm.humanizedPermissionName}
                </li>
              )) :
              <span>Escolha o grupo primeiro.</span>}
            </ul>
          </div>
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
      
    </>
  );
}
