import { useState } from 'react';
import GoogleIcon from '../../components/GoogleIcon';
import { Header32 } from '../../components/Header';
import { InputContornado } from '../../components/Inputs';
import styles from './SolicitacoesAdm.module.scss';
import DropdownItem from '../../types/DropdownItem';
import { DropdownContornado } from '../../components/Dropdowns';
import { ItemLista } from '../../components/ItemLista';
import { AcaoNotas, AcaoProducao } from '../../components/ItemLista/Acoes';
import { Botao } from '../../components/Botoes';
import { CriarSolicitacao, EditarSolicitacao } from '../../popUps';
import VizualizarSolicitacao from '../../popUps/VizualizarSolicitacao';

export default function SolicitacoesAdm () {
    const [filtroNome, setFiltroNome] = useState('');
    const [tipo, setTipo] = useState('Feature');
    const [status, setStatus] = useState('Recentes');

    const [popup, setPopup] = useState(false);
    const [popupRecente, setPopupRecente] = useState(false);

    // const listaStatus = ['Recentes', 'Em avaliação', 'Em produção', 'Arquivados'];
    const listaStatus = ['Recentes', 'Em Avaliação', 'Em Produção', 'Arquivados']

    const busca = (titulo: string) => {
        const regex = new RegExp(filtroNome, 'i');
        return regex.test(titulo);
    }
    
    return (
        <>
            <section className={styles.section}>
                <Header32>Solicitações</Header32>
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
                    {status == 'Recentes' && <>
                        <ItemLista
                        itemName='teste'
                        handleClickName={() => setPopupRecente(true)}
                        acao={<span>Criado em 01/01/2023</span>} />
                        <ItemLista
                        itemName='teste'
                        handleClickName={() => console.log('aberto')}
                        acao={<span>Editado em 01/01/2023</span>} />
                    </>}
                    {status ==  'Em Avaliação' && <>
                        <ItemLista
                        itemName='teste'
                        handleClickName={() => console.log('aberto')}
                        acao={<AcaoNotas
                        notaCusto={3}
                        notaImpacto={3}
                        notaRisco={2}
                        notaPreenchida={true}
                        />}/>
                    </>}
                    {status == 'Em Produção' && <>
                        <ItemLista
                        itemName='teste'
                        handleClickName={() => console.log('aberto')}
                        acao={<AcaoProducao status='new' />} />
                        <ItemLista
                        itemName='teste'
                        handleClickName={() => console.log('aberto')}
                        acao={<AcaoProducao status='on-holding' />} />
                        <ItemLista
                        itemName='teste'
                        handleClickName={() => console.log('aberto')}
                        acao={<AcaoProducao status='done' />} />
                    </>}
                    {status == 'Arquivados' && <>
                        <ItemLista
                        itemName='teste'
                        handleClickName={() => console.log('aberto')}
                        acao={<span>Arquivado em 01/01/2023</span>} />
                    </>}
                </ul>
                <VizualizarSolicitacao aberto={popupRecente} onClose={() => setPopupRecente(false)} />
            </section>
        </>
    );
}