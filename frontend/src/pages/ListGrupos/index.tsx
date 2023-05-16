import styles from './ListGrupos.module.scss';
import { useEffect, useState } from 'react';
import GoogleIcon from '../../components/GoogleIcon';
import { Header32 } from '../../components/Header';
import { InputContornado } from '../../components/Inputs';
import { GrupoProps, UsuarioProps } from '../../types';
import { Botao } from '../../components/Botoes';
import { useContexto } from '../../context/contexto';
import ItemNome from '../../components/ItemNome';
import Usuarios from '../../services/Usuarios';
import PopupAlerta from '../../popUps/PopupAlerta';
import PopupConfirm from '../../popUps/PopupConfirm';
import PopupErro from '../../popUps/PopupErro';
import PopupCarregando from '../../popUps/PopupCarregando';
import { useNavigate } from 'react-router-dom';
import Grupos from '../../services/Grupos';

export default function ListGrupos() {
  const { usuario } = useContexto();
  const nav = useNavigate();

  const [busca, setBusca] = useState('');

  const [grupos, setGrupos] = useState<GrupoProps[]>([]);
  const [grupoSelect, setGrupoSelect] = useState<GrupoProps>();

  const [alerta, setAlerta] = useState(false);
  const [carregando, setCarregando] = useState(false);
  const [confirma, setConfirma] = useState(false);
  const [erro, setErro] = useState(false);

  const filtrarNome = (titulo: string) => {
    const regex = new RegExp(busca, 'i');
    return regex.test(titulo);
  }

  const getGrupos = () => {
    Grupos.getAll().then((data) => {
      setGrupos(data.filter((grupo: GrupoProps) => {
        const filterPesquisa = filtrarNome(grupo.name);
        return filterPesquisa;
      }));
    });
  }

  useEffect(() => {
    getGrupos();
  }, [busca]);
  return (
    <>
      <Header32 className={styles.titulo}>
        Grupos
      </Header32>
      <section className={styles.section}>
        <div className={styles.esquerda}>
          <div className={styles.inputContainer}>
            <InputContornado
              className={styles.inputPreenchimento}
              placeholder='Pesquisar grupo...'
              icon={<GoogleIcon>&#xe8b6;</GoogleIcon>}
              handleChange={(e) => setBusca(e.target.value)}
            />
          </div>
          <div className={styles.inputContainer}>
            {usuario.role.permissions.find(perm => perm.id == 4) && 
            <Botao
              handleClick={() => {
                nav('/criar-grupo');
              }}
              className={styles.botao}>
              Criar grupo
            </Botao>}
          </div>
          <div
            className={styles.listContainer}
            onClick={() => setGrupoSelect(undefined)}>
            {grupos.length ?
              grupos.map((grupo: GrupoProps) => (
                <ItemNome
                  key={grupo.id}
                  nome={grupo.name}
                  desc={''}
                  handleClick={() => setGrupoSelect(grupo)}
                  isSelected={grupoSelect && grupo.id == grupoSelect.id}
                />
              ))
              : <span className={styles['not-found']}>Nenhum grupo encontrado.</span>}
          </div>
        </div>
        <div className={styles.direita}>
          {grupoSelect ?
            <div className={styles['user-container']}>
              <h2 className={styles['user-titulo']}>
                {grupoSelect.name}
              </h2>
              <div className={styles['perm-container']}>
                <div>Os participantes deste grupo podem:</div>
                <ul className={styles['perm-list']}>
                  {grupoSelect.permissions.map((perm) => (
                    <li key={perm.id}>
                      {perm.humanizedPermissionName}
                    </li>
                  ))}
                </ul>
              </div>
              <div className={styles['user-espacador']}></div>
              <div className={styles['user-botoes']}>
                {usuario.role.permissions.find(perm => perm.id == 5) && 
                  <Botao
                  handleClick={() => {
                    nav(`/editar-usuario/${grupoSelect.id}`)
                  }}
                  className={styles.botao}>
                  Editar
                </Botao>}
                {usuario.role.permissions.find(perm => perm.id == 6) && 
                  <Botao
                  className={styles.botao}
                  handleClick={() => setAlerta(true)}>
                  Excluir
                </Botao>}
              </div>
            </div>
            : <span className={styles['not-found']}>
              Nenhum grupo selecionado. Clique em uma deles na lista ao lado.
            </span>}
        </div>
      </section>
      {grupoSelect && <>
        <PopupAlerta
          visivel={alerta}
          onClose={() => setAlerta(false)}
          titulo='Exclusão de usuário'
          descricao={`Confirma a exclusão do grupo ${grupoSelect.name}?`}
          onConfirm={() => {
            setAlerta(false);
            setCarregando(true);
            Grupos.deletar(grupoSelect.id).then(() => {
              setCarregando(false);
              setConfirma(true);
              setGrupoSelect(undefined);
              getGrupos();
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
        descricao={`Grupo excluído com sucesso.`}
      />
      <PopupErro
        visivel={erro}
        onClose={() => setErro(false)}
        titulo='Erro ao excluir grupo'
        descricao='Não foi possível excluir o grupo devido à um erro interno do servidor. Tente novamente mais tarde.'
      />
      <PopupCarregando
        visivel={carregando}
      />
    </>
  );
}