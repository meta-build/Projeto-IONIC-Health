import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useContexto } from "../../../../context/contexto";
import Grupos from "../../../../services/Grupos";
import { GrupoProps, PermissionProps } from "../../../../types";
import styles from "./DetailGrupos.module.scss"
import { DropdownOpcoes } from "../../../../components/Dropdowns";
import PopupAlerta from '../../../../popUps/PopupAlerta';
import PopupConfirm from '../../../../popUps/PopupConfirm';
import PopupErro from '../../../../popUps/PopupErro';
import PopupCarregando from '../../../../popUps/PopupCarregando';
import GoogleIcon from "../../../../components/GoogleIcon";

interface Props {
  grupoSelect: GrupoProps;
  onBack: () => void;
}

interface ItemProps {
  label: string;
  onClick: () => void;
}

export default function DetailGrupos({ grupoSelect, onBack }: Props) {
  const nav = useNavigate();
  const { usuario } = useContexto();
  
  const [alerta, setAlerta] = useState(false);
  const [carregando, setCarregando] = useState(false);
  const [confirma, setConfirma] = useState(false);
  const [erro, setErro] = useState(false);
  
  const botoes: ItemProps[] = [
    usuario.role.permissions.find(perm => perm.id == 5) ?
    { label: 'Editar', onClick: () => nav(`/editar-grupo/${grupoSelect.id}`) } : null,
    usuario.role.permissions.find(perm => perm.id == 6) ?
    { label: 'Excluir', onClick: () => setAlerta(true) } : null
  ].filter(Boolean) as ItemProps[];
  
  const handleVoltar = () => {
    onBack();
  };

  return (
    <section id='mobile'>
      <div className={styles.container}>
        <section className={styles.section}>
          <div className={styles.direita}>
            <div className={styles['user-container']}>
              <button
                onClick={handleVoltar}
                className={styles.botaoVoltar}>
                <GoogleIcon>&#xe5cb;</GoogleIcon>
                <span className={styles.textoVoltar}>Voltar</span>
              </button>
              <h2 className={styles['user-titulo']}>
                {grupoSelect.name}
              </h2>
              <div className={styles['perm-container']}>
                Os usuários neste grupo podem:
                <ul className={styles['perm-list']}>
                  {grupoSelect.permissions.map((perm) => (
                    <li key={perm.id}>
                      {perm.humanizedPermissionName}
                    </li>
                  ))}
                </ul>
              </div>
              <div className={styles['user-espacador']} />
              <div className={styles['user-botoes']}>
                <DropdownOpcoes
                  options={botoes}
                />
              </div>
            </div>
          </div>
        </section>
      </div>
      <PopupAlerta
        visivel={alerta}
        onClose={() => setAlerta(false)}
        titulo='Exclusão de grupo'
        descricao={`Confirma a exclusão do grupo ${grupoSelect.name}?`}
        onConfirm={() => {
          setAlerta(false);
          setCarregando(true);
          Grupos.deletar(grupoSelect.id).then(() => {
            setCarregando(false);
            setConfirma(true);
          }).catch(() => {
            setCarregando(false);
            setErro(true);
          })
        }}
      />
      <PopupConfirm
        visivel={confirma}
        onClose={() => {
          setConfirma(false);
          onBack();
        }}
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