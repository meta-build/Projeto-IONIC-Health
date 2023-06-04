import classNames from 'classnames';
import { Botao } from '../../../components/Botoes';
import GoogleIcon from '../../../components/GoogleIcon';
import { InputEscuro } from '../../../components/Inputs';
import PopupCarregando from '../../../popUps/PopupCarregando';
import PopupConfirm from '../../../popUps/PopupConfirm';
import PopupErro from '../../../popUps/PopupErro';
import styles from './CriarGrupoMobile.module.scss';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import PermissoesCustomizadasPanel from '../../../components/PermissoesCustomizadasPanel';
import Grupos from '../../../services/Grupos';

export default function CriarGrupoMobile() {
  const { id } = useParams();
  const nav = useNavigate();

  const [nome, setNome] = useState('');
  const [nomeErro, setNomeErro] = useState(false);

  const [permsEscolhidas, setPermsEscolhidas] = useState<number[]>([]);

  const [carregando, setCarregando] = useState(false);
  const [confirm, setConfirm] = useState(false);
  const [fail, setFail] = useState(false);
  const [confirmEdit, setConfirmEdit] = useState(false);
  const [failEdit, setFailEdit] = useState(false);
  const [failGet, setFailGet] = useState(false);

  const submit = () => {
    if (!nome) {
      setNomeErro(true);
    } else {
      setCarregando(true);
      if (!id) {
        Grupos.criar({
          name: nome,
          isAdmin: false,
          permissions: permsEscolhidas
        }).then(() => {
          setCarregando(false);
          setConfirm(true);
        }).catch(() => {
          setCarregando(false);
          setFail(true)
        })
      } else {
        Grupos.editar(Number(id), {
          name: nome,
          isAdmin: false,
          permissions: permsEscolhidas
        }).then(() => {
          setCarregando(false);
          setConfirmEdit(true);
        }).catch(() => {
          setCarregando(false);
          setFailEdit(true);
        });
      }
    }
  }

  useEffect(() => {
    if (id) {
      Grupos.getByID(Number(id)).then(grupo => {
        setNome(grupo.name);
        setPermsEscolhidas(grupo.permissions.map(perm => perm.id));
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
        <h2 className={styles.title}>{id ? 'Editar grupo' : 'Novo grupo'}</h2>
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
          <PermissoesCustomizadasPanel
            permEscolhidas={permsEscolhidas}
            addPermission={id => setPermsEscolhidas(prevState => [...prevState, id])}
            removePermission={id => setPermsEscolhidas(prevState => prevState.filter(e => e !== id))}
          />
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
              nav('/grupos');
            }}
            titulo='Grupo criado com sucesso'
            descricao={`Grupo ${nome} criado com sucesso.`} />
          <PopupErro
            visivel={fail}
            onClose={() => setFail(false)}
            titulo='Erro de criação de Grupo'
            descricao='Não foi possível criar o Grupo devido a um erro interno do servidor. Tente novamente mais tarde.' />
        </>}
      {id &&
        <>
          <PopupConfirm
            visivel={confirmEdit}
            onClose={() => {
              setConfirmEdit(false);
              nav('/grupos');
            }}
            titulo='Grupo editado com sucesso'
            descricao={`Grupo ${nome} editado com sucesso.`} />
          <PopupErro
            visivel={failEdit}
            onClose={() => setFailEdit(false)}
            titulo='Erro de edição de Grupo'
            descricao='Não foi possível editar o Grupo devido a um erro interno do servidor. Tente novamente mais tarde.' />
          <PopupErro
            visivel={failGet}
            onClose={() => {
              setFailGet(false);
              nav(-1);
            }}
            titulo='Erro ao abrir edição de Grupo'
            descricao='Não será possível editar o Grupo devido a um erro interno do servidor. Tente novamente mais tarde.' />
        </>
      }
    </>
  )
}