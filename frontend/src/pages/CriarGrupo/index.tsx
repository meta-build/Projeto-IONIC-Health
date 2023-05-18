import styles from './CriarGrupo.module.scss';
import { Header36 } from '../../components/Header';
import { useEffect, useState } from 'react';
import { Aba, Botao, BotaoSwitch } from '../../components/Botoes';
import classNames from 'classnames';
import InputEscuro from '../../components/Inputs/InputEscuro';
import Permissoes from '../../services/Permissoes';
import { PermissionProps } from '../../types';
import Grupos from '../../services/Grupos';
import PopupCarregando from '../../popUps/PopupCarregando';
import PopupConfirm from '../../popUps/PopupConfirm';
import PopupErro from '../../popUps/PopupErro';
import { useNavigate, useParams } from 'react-router-dom';

export default function CriarGrupo() {
  const nav = useNavigate();
  const { id } = useParams();

  const [titulo, setTitulo] = useState('');
  const [permsEscolhidas, setPermsEscolhidas] = useState<number[]>([]);

  const [perms, setPerms] = useState<PermissionProps[]>([]);
  const [aba, setAba] = useState('Solicitações');

  const [erro, setErro] = useState(false);

  const [carregando, setCarregando] = useState(false);
  const [sucesso, setSucesso] = useState(false);
  const [falha, setFalha] = useState(false);

  const [sucessoEdit, setSucessoEdit] = useState(false);
  const [falhaEdit, setFalhaEdit] = useState(false);

  const submit = () => {
    if (!titulo) {
      setErro(true);
    } else {
      setCarregando(true);
      if (!id) {
        Grupos.criar({
          name: titulo,
          isAdmin: false,
          permissions: permsEscolhidas
        }).then(() => {
          setCarregando(false);
          setSucesso(true);
        }).catch(() => {
          setCarregando(false);
          setFalha(true)
        })
      } else {
        Grupos.editar(Number(id), {
          name: titulo,
          isAdmin: false,
          permissions: permsEscolhidas
        }).then(() => {
          setCarregando(false);
          setSucessoEdit(true);
        }).catch(() => {
          setCarregando(false);
          setFalhaEdit(true);
        });
      }
    }
  }

  useEffect(() => {
    Permissoes.getAll().then(perms => {
      setPerms(perms);
    });
    if (id) {
      Grupos.getByID(Number(id)).then(grupo => {
        setTitulo(grupo.name);
        setPermsEscolhidas(grupo.permissions.map(perm => perm.id));
      });
    }
  }, [])

  return (
    <>
      <Header36
        className={styles.hd}>
        Novo grupo
      </Header36>
      <form
        className={styles.form}
        onSubmit={(e) => {
          e.preventDefault();
          submit();
        }}>
        <div
          className={styles.ip}>
          <label
            className={classNames({
              [styles.lb]: true,
              [styles.preencher]: true,
            })}>
            Nome
            <InputEscuro
              className={classNames({
                [styles.erro]: erro
              })}
              onFocus={() => setErro(false)}
              valor={titulo}
              handleChange={(e) => setTitulo(e.target.value)}
            />
          </label>
        </div>
        <label className={styles.label}>
          Permissões
        </label>
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
          {perms && perms.map(perm => (
            aba == perm.humanizedEntity &&
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
        <div className={styles['linha-submit']}>
          {/* botão não tem onclick, pois o submit já faz toda a ação de enviar o formulário. a função chamada está no onsubmit, no começo da tag form */}
          {erro &&
            <span className={styles.erro}>
              O grupo precisa ter um nome.
            </span>}
          <div
            className={styles.botoes}>
            <Botao className={classNames({
              [styles['bt-branco']]: true,
              [styles.bt]: true,
            })}>
              Cancelar
            </Botao>
            <Botao tipo='submit' className={styles.bt}>
              {id ? 'Editar' : 'Criar'}
            </Botao>
          </div>
        </div>
      </form>
      <div className={styles.espacador} />
      <PopupConfirm
        visivel={sucesso}
        onClose={() => {
          setSucesso(false);
          nav(-1);
        }}
        titulo='Concluído'
        descricao={`Grupo criado com sucesso.`}
      />
      <PopupErro
        visivel={falha}
        onClose={() => setFalha(false)}
        titulo='Erro ao criar grupo'
        descricao='Não foi possível criar o grupo devido à um erro interno do servidor. Tente novamente mais tarde.'
      />
      <PopupConfirm
        visivel={sucessoEdit}
        onClose={() => {
          setSucessoEdit(false);
          nav(-1);
        }}
        titulo='Concluído'
        descricao={`Grupo editado com sucesso.`}
      />
      <PopupErro
        visivel={falhaEdit}
        onClose={() => setFalhaEdit(false)}
        titulo='Erro ao editar grupo'
        descricao='Não foi possível editar o grupo devido à um erro interno do servidor. Tente novamente mais tarde.'
      />
      <PopupCarregando
        visivel={carregando}
      />
    </>
  );
}