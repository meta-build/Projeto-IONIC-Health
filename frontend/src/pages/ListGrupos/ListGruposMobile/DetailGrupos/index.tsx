import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useContexto } from "../../../../context/contexto";
import Grupos from "../../../../services/Grupos";
import { GrupoProps, PermissionProps } from "../../../../types";
import styles from "./DetailGrupos.module.scss"
import { DropdownOpcoes } from "../../../../components/Dropdowns";
import { FaArrowLeft } from "react-icons/fa";
import PopupAlerta from '../../../../popUps/PopupAlerta';
import PopupConfirm from '../../../../popUps/PopupConfirm';
import PopupErro from '../../../../popUps/PopupErro';
import PopupCarregando from '../../../../popUps/PopupCarregando';
import { Aba, BotaoSwitch } from "../../../../components/Botoes";
import Permissoes from "../../../../services/Permissoes";

interface Props{
    grupoSelect: GrupoProps;
    onBack:() => void;
}

interface ItemProps {
    label: string;
    onClick: () => void;
}


export default function DetailGrupos({grupoSelect, onBack}:Props){


    const handleVoltar = () => {
        onBack(); 
    };

  const [titulo, setTitulo] = useState('');
  // const [permsEscolhidas, setPermsEscolhidas] = useState<number[]>([]);

    const [perms, setPerms] = useState<PermissionProps[]>([]);
    const [alerta, setAlerta] = useState(false);
    const [carregando, setCarregando] = useState(false);
    const [confirma, setConfirma] = useState(false);
    const [erro, setErro] = useState(false);
    const { usuario } = useContexto();
    const nav = useNavigate();
    const [busca, setBusca] = useState('');
    const [grupos, setGrupos] = useState<GrupoProps[]>([]);
    const [aba, setAba] = useState('Solicitações');
    const { id } = useParams();

    const botoes: ItemProps[] = [
        usuario.role.permissions.find(perm => perm.id == 5) ?
      { label: '', onClick: () => nav(`/editar-grupo`) } : null,
        usuario.role.permissions.find(perm => perm.id == 6) ?
        { label: '', onClick: () => setAlerta(true) } : null

    ].filter(Boolean) as ItemProps[];

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
    
    // useEffect(() => {
    //   Permissoes.getAll().then(perms => {
    //     setPerms(perms);
    //   });
    //   if (id) {
    //     Grupos.getByID(Number(id)).then(grupo => {
    //       setTitulo(grupo.name);
    //       setPermsEscolhidas(grupo.permissions.map(perm => perm.id));
    //     });
    //   }
    // }, [])


    return(     
        <section id='mobile'>
            <div className={styles.container}>  
            
                <section className={styles.section}>   
                <div className={styles.direita}>    

                <div className={styles['user-container']}>
                <button 
                    onClick={handleVoltar}
                    className={styles.botaoVoltar}
                >
                    <FaArrowLeft className="icone-seta" />
                    <span className={styles.textoVoltar}>Voltar</span>     
                </button>
                
              <h2 className={styles['user-titulo']}>
                {grupoSelect.name}
              </h2>
              <div className={styles['aba-container']}>
                <Aba
                    className={styles.aba}
                    handleClick={() => setAba('Participantes')}
                    isActive={aba == 'Participantes'}>
                    Participantes
                </Aba>
                <Aba
                    className={styles.aba}
                    handleClick={() => setAba('Permissões')}
                    isActive={aba == 'Permissões'}>
                    Permissões
                </Aba>

            </div>
              <div className={styles['perm-container']}>
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

                <DropdownOpcoes 
                options={[
                    {
                        label: 'Editar', 
                        onClick: () => {
                            nav(`/editar-grupo/${grupoSelect.id}`)
                        }
                    },
                    {
                        label: 'Excluir', 
                        onClick: () => { 
                            setAlerta(true)                        
                            
                        }},
                ]} 
                />
                
              </div>

            </div>
            : 
        </div>
      </section>   
    </div>
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
        //   setGrupoSelect(undefined);
        getGrupos();
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
    </section>
)
}