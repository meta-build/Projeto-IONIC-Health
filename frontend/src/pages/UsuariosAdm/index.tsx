import { useState } from 'react';
import GoogleIcon from '../../components/GoogleIcon';
import { Header32 } from '../../components/Header';
import { InputContornado } from '../../components/Inputs';
import styles from './UsuariosAdm.module.scss';
import DropdownItem from '../../types/DropdownItem';
import { DropdownContornado } from '../../components/Dropdowns';
import { ItemLista } from '../../components/ItemLista';
import { Botao } from '../../components/Botoes';

export default function UsuariosAdm () {
    const [filtroNome, setFiltroNome] = useState('');
    const [tipo, setTipo] = useState('Feature');

    const busca = (titulo: string) => {
        const regex = new RegExp(filtroNome, 'i');
        return regex.test(titulo);
    }
    
    return (
        <>
            <section className={styles.section}>
                <Header32>Usuários</Header32>
                <div className={styles.inputContainer}>
                    <InputContornado
                    className={styles.inputPreenchimento}
                    placeholder='Pesquisar usuário...'
                    icon={<GoogleIcon>&#xe8b6;</GoogleIcon>}
                    handleChange={(e) => setFiltroNome(e.target.value)} />
                    <DropdownContornado
                    itens={[
                        new DropdownItem('Todos', <></>),
                        new DropdownItem('Solicitante', <></>),
                        new DropdownItem('Avaliador', <></>),
                        new DropdownItem('Admnistrador', <></>)
                    ]}
                    handleSelected={(s: string) => setTipo(s)}
                    />
                </div>
                <div className={styles.botaoCriarContainer}>
                        <Botao
                        className={styles.botaoCriar}
                        handleClick={() => console.log('criar usuários')}
                        variante='contornado'>
                            Criar Usuário
                        </Botao>
                </div>
                <ul className={styles.lista}>
                    <>
                        <ItemLista
                        itemName='Fulano'
                        handleClickName={() => console.log('aberto')}
                        acao={<span>Solicitante</span>} />
                        <ItemLista
                        itemName='Ciclano'
                        handleClickName={() => console.log('aberto')}
                        acao={<span>Admnistrador</span>} />
                    </>
                </ul>
            </section>
        </>
    );
}