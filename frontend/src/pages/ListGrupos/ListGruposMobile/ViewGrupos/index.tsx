import styles from './ListGruposMobile.module.scss';
import { useEffect, useState } from 'react';
import GoogleIcon from '../../../../components/GoogleIcon';
import { Header32 } from '../../../../components/Header';
import { InputContornado } from '../../../../components/Inputs';
import { GrupoProps } from '../../../../types';
import { Botao } from '../../../../components/Botoes';
import { useContexto } from '../../../../context/contexto';
import ItemNome from '../../../../components/ItemNome';
import { useNavigate } from 'react-router-dom';
import Grupos from '../../../../services/Grupos';
import DetailGrupos from '../DetailGrupos';


export default function ListGruposMobile() {
  const navigate = useNavigate();
  const { usuario } = useContexto();
  const nav = useNavigate();

  const [busca, setBusca] = useState('');

  const [grupos, setGrupos] = useState<GrupoProps[]>([]);
  const [grupoSelect, setGrupoSelect] = useState<GrupoProps>();
  

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


  const handleVoltar = () => {
    navigate(-1);
  };

  return (
    <>
      {!grupoSelect && <section id='mobile'>
        <div className={styles.listContainer}>
          <Header32 className={styles.titulo}>
            <button
              className={styles.botaoVoltar}
              onClick={handleVoltar}
            >
              <GoogleIcon>&#xe5cb;</GoogleIcon>
              <span className={styles.textoVoltar}>Voltar</span>
            </button>
            Grupos
          </Header32>
          <section className={styles.section}>
            <div className={styles.esquerda}>
              <div>
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
                className={styles.listContainer2}
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

          </section>
        </div>
      </section>}
      {grupoSelect && < DetailGrupos onBack={()=>setGrupoSelect(undefined)} grupoSelect={grupoSelect}/>}
    </>
  );
}