import { ChangeEvent, useState } from 'react';
import styles from './NovoUsuario.module.scss';
import Usuarios from '../../services/Usuarios';
import classNames from 'classnames';
import { Header32 } from '../../components/Header';
import InputEscuro from '../../components/Inputs/InputEscuro';
import DropdownEscuro from '../../components/Dropdowns/DropdownEscuro';
import { Botao } from '../../components/Botoes';
import { ItemLista } from '../../components/ItemLista';




export default function NovoUsuario () {

    // pegar valor de cada campo
  const [nome, setNome] = useState('');
  const [grupo, setGrupo] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');

  // se true > destacar campo em vermelho
  const [erroNome, setErroNome] = useState(false);
  const [erroGrupo, setErroGrupo] = useState(false);
  const [erroEmail, setErroEmail] = useState(false);
  const [erroSenha, setErroSenha] = useState(false);

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

  const submit = () => {
    if (!nome || !grupo || !email || !senha) {
      setErroNome(!nome);
      setErroGrupo(!grupo);
      setErroEmail(!email);
      setErroSenha(!senha);
    } else {
      Usuarios.criar({
        grupoId: intGrupo(grupo),
        mail: email,
        name: nome,
        password: senha
      }).then(() => {
        
      });
    }
  }
    return (
    <>
      <Header32 className={styles.header}>Novo Usuário</Header32>
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
            itens={['Solicitante', 'Administrador', 'Avaliador (Risco)', 'Avaliador (Impacto)', 'Avaliador (Custo)']}
            selecionadoFst=" "
            handleSelected={(s) => setGrupo(s)}
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
        <div>
          <label className={styles.lista}>• Criar solicitação</label>
          
        </div>
          <label className={styles.lista}>• Editar solicitação</label>   
          <div>
          <label className={styles.lista}>• Liberar solicitação para aprovação</label>
        </div>
        </div>

        <div className={
          styles['linha-submit']
          }>
          <span className={styles.linha2}>
            <Botao
              className={styles.botaoCancelar}  
              variante='contornado'>
              Cancelar
            </Botao>
            <Botao
            tipo="submit"
              className={styles.botaoCriar}
              variante='contornado'>
              Criar
            </Botao>
            
          </span> 
        </div>
     
       </form>
      </div>  
                   
    </>
  );
}
