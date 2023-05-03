import styles from './UsuariosAdm.module.scss';
import { useEffect, useState } from 'react';
import GoogleIcon from '../../components/GoogleIcon';
import { Header32 } from '../../components/Header';
import { InputContornado } from '../../components/Inputs';
import { DropdownContornado } from '../../components/Dropdowns';
import { ItemLista } from '../../components/ItemLista';
import { Botao } from '../../components/Botoes';
import {
  CriarUsuario,
  VisualizarUsuario
} from '../../popUps';
import Usuarios from '../../services/Usuarios';
import { UsuarioProps } from '../../types';

export default function UsuariosAdm() {
  const [usuarios, setUsuarios] = useState<UsuarioProps[]>();
  const [userSelecionado, setUserSelecionado] = useState<number>();

  const [busca, setBusca] = useState('');
  const [tipo, setTipo] = useState('Todos');

  const [criarPopUp, setCriarPopUp] = useState(false);
  const [visualizarPopup, setVisualizarPopup] = useState(false);

  const filtrarNome = (titulo: string) => {
    const regex = new RegExp(busca, 'i');
    return regex.test(titulo);
  }

  const filtrarGrupo = (grupoId: number) => {
    switch (tipo) {
      case 'Admnistrador':
        return grupoId == 1;
      case 'Solicitante':
        return grupoId == 2;
      case 'Avaliador (Geral)':
        return grupoId >= 3;
      case 'Avaliador (Risco)':
        return grupoId == 3;
      case 'Avaliador (Custo)':
        return grupoId == 4;
      case 'Avaliador (Impacto)':
        return grupoId == 5;
      default:
        return true;
    }
  }

  const groupStringify = (id: number) => {
    switch (id) {
      case 1:
        return 'Administrador';
      case 2:
        return 'Solicitante';
      case 3:
        return 'Avaliador (Risco)';
      case 4:
        return 'Avaliador (Custo)';
      default:
        return 'Avaliador (Impacto)';
    }
  }

  useEffect(() => {
    Usuarios.getAll().then(data => {
      const usuariosFiltrados = data.filter(user => {
        return filtrarNome(user.name) && filtrarGrupo(user.grupoId);
      })
      setUsuarios(usuariosFiltrados);
    });
  }, [busca, tipo, criarPopUp, visualizarPopup]);
  return (
    <>
      <section className={styles.section}>
        <Header32>Usuários</Header32>
        <div className={styles.inputContainer}>
          <InputContornado
            className={styles.inputPreenchimento}
            placeholder='Pesquisar usuário...'
            icon={<GoogleIcon>&#xe8b6;</GoogleIcon>}
            handleChange={(e) => setBusca(e.target.value)}
          />
          <DropdownContornado
            itens={[
              { label: 'Todos', icon: <></> },
              { label: 'Admnistrador', icon: <></> },
              { label: 'Solicitante', icon: <></> },
              { label: 'Avaliador (Geral)', icon: <></> },
              { label: 'Avaliador (Custo)', icon: <></> },
              { label: 'Avaliador (Risco)', icon: <></> },
              { label: 'Avaliador (Impacto)', icon: <></> }
            ]}
            handleSelected={(s: string) => setTipo(s)}
          />
        </div>
        <div className={styles.botaoCriarContainer}>
          <Botao
            className={styles.botaoCriar}
            handleClick={() => setCriarPopUp(true)}
            variante='contornado'>
            Criar Usuário
          </Botao>
        </div>
        <ul className={styles.lista}>
          <>
            {usuarios && usuarios.map(user => (
              <ItemLista
                itemName={user.name}
                handleClickName={() => {
                  setUserSelecionado(user.id)
                  setVisualizarPopup(true);
                }}
                acao={
                  <span>
                    {groupStringify(user.grupoId)}
                  </span>}
              />
            ))}
          </>
        </ul>
        <CriarUsuario
          aberto={criarPopUp}
          onClose={() => setCriarPopUp(false)}
        />
        <VisualizarUsuario
          idUser={userSelecionado}
          aberto={visualizarPopup}
          onClose={() => setVisualizarPopup(false)}
        />
      </section>
    </>
  );
}