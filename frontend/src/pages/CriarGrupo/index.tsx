import styles from './CriarGrupo.module.scss';
import { Header36 } from '../../components/Header';
import { DropdownPreenchido } from '../../components/Dropdowns';
import { useEffect, useState } from 'react';
import { InputPopup, TextBox } from '../../components/Inputs';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Aba, Anexar, Botao, BotaoPopup, BotaoPreenchido, BotaoSwitch } from '../../components/Botoes';
import { faX } from '@fortawesome/free-solid-svg-icons';
import classNames from 'classnames';
import InputEscuro from '../../components/Inputs/InputEscuro';
import DropdownEscuro from '../../components/Dropdowns/DropdownEscuro';
import TextBoxEscuro from '../../components/Inputs/TextBoxEscuro';
import AnexarEscuro from '../../components/Botoes/AnexarEscuro';



export default function CriarGrupo() {
  const [titulo, setTitulo] = useState('');
  const [permsEscolhidas, setPermsEscolhidas] = useState([]);

  const [perms, setPerms] = useState({});

  const [aba, setAba] = useState('Solicitações');

  const [erro, setErro] = useState(false);

  useEffect(() => {
    setPerms({
      'Solicitações': [
        'Criar solitiação',
        'Editar solicitação',
        'Arquivar solicitação',
        'Excluir solicitação',
        'Avaliar solicitação em Risco',
        'Avaliar solicitação em Custo',
        'Avaliar solicitação em Impacto',
        'Aprovar solicitação para avaliação',
        'Aprovar solicitação para produção',
        'Alterar status de produção da solicitação'
      ],
      'Usuários': [
        'Criar usuários',
        'Editar usuários',
        'Excluir usuários'
      ],
      'Grupos': [
        'Criar grupos',
        'Editar grupos',
        'Excluir grupos'
      ],
    })
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
          if(!titulo){
            setErro(true);
          } else {
            console.log(titulo, permsEscolhidas)
          }
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
          {perms[aba] && perms[aba].map(perm => (
            <li className={styles['perms-item']}>
              <BotaoSwitch
              isActive={permsEscolhidas.includes(perm)}
              handleClick={(value) => {
                if(value){
                  setPermsEscolhidas(prevState => [...prevState, perm])
                } else {
                  setPermsEscolhidas(prevState => prevState.filter(e => e !== perm))
                }
               }} />
              <div className={classNames({
                [styles.desactive]: !permsEscolhidas.includes(perm)
              })}>{perm}</div>
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
              Criar
            </Botao>
          </div>
        </div>
      </form>
      <div className={styles.espacador} />
    </>
  );
}