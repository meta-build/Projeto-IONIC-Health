import { useState } from 'react';
import GoogleIcon from '../../components/GoogleIcon';
import { Header32 } from '../../components/Header';
import { InputContornado } from '../../components/Inputs';
import styles from './HomeAvaliador.module.scss';
import DropdownItem from '../../types/DropdownItem';
import { DropdownContornado } from '../../components/Dropdowns';
import { ItemLista } from '../../components/ItemLista';
import { AcaoNotas } from '../../components/ItemLista/Acoes';
import { Botao } from '../../components/Botoes';
import AvaliarSolicitacao from '../../popUps/AvaliarSolicitacao';
import VisualizarSolicitacaoAvaliacao from '../../popUps/VizualizarSolicitacaoAvaliacao';

export default function HomeAvaliador () {
    const [filtroNome, setFiltroNome] = useState('');
    const [tipo, setTipo] = useState('Feature');
    const [status, setStatus] = useState('Sem nota de Risco');

    const [popup, setPopup] = useState(false);

    const listaStatus = ['Sem nota de Risco', 'Todos']

    const busca = (titulo: string) => {
        const regex = new RegExp(filtroNome, 'i');
        return regex.test(titulo);
    }
    
    return (
        <>
            <section className={styles.section}>
                <Header32>Solicitações para avaliar</Header32>
                <div className={styles.inputContainer}>
                    <InputContornado
                    className={styles.inputPreenchimento}
                    placeholder='Pesquisar Solicitação...'
                    icon={<GoogleIcon>&#xe8b6;</GoogleIcon>}
                    handleChange={(e) => setFiltroNome(e.target.value)} />
                    <DropdownContornado
                    itens={[
                        new DropdownItem('Feature', <GoogleIcon>&#xE8B8;</GoogleIcon>),
                        new DropdownItem('Hotfix', <GoogleIcon>&#xf10b;</GoogleIcon>)
                    ]}
                    handleSelected={(s: string) => setTipo(s)}
                    />
                </div>
                <div className={styles.botoes}>
                    {listaStatus.map((s, index) => (
                        <Botao
                        key={index}
                        className={styles.botao}
                        handleClick={() => setStatus(s)}
                        variante={s == status ? 'preenchido' : 'contornado'}>
                            {s}
                        </Botao>
                    ))}
                </div>
                <ul className={styles.lista}>
                    {status ==  'Sem nota de Risco' && <>
                        <ItemLista
                        itemName='teste'
                        handleClickName={() => setPopup(true)}
                        acao={<AcaoNotas
                        notaCusto={3}
                        notaImpacto={3}
                        notaRisco={2}
                        notaPreenchida={true}
                        />} />
                    </>}
                    {status ==  'Todos' && <>
                        <ItemLista
                        itemName='teste2'
                        handleClickName={() => setPopup(true)}
                        acao={<AcaoNotas
                        notaCusto={3}
                        notaImpacto={3}
                        notaRisco={2}
                        notaPreenchida={true}
                        />}/>
                    </>}
                </ul>
                <VisualizarSolicitacaoAvaliacao aberto={popup} onClose={() => setPopup(false)} />
            </section>
        </>
    );
}