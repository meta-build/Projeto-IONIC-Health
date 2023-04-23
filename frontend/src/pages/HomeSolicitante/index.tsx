import { useEffect, useState } from 'react';
import GoogleIcon from '../../components/GoogleIcon';
import { Header32 } from '../../components/Header';
import { InputContornado } from '../../components/Inputs';
import styles from './HomeSolicitante.module.scss';
import DropdownItem from '../../types/DropdownItem';
import { DropdownContornado } from '../../components/Dropdowns';
import { ItemLista } from '../../components/ItemLista';
import { AcaoEditarExcluir, AcaoNotas, AcaoProducao } from '../../components/ItemLista/Acoes';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';


import { Botao, Voltar } from '../../components/Botoes';
import { CriarSolicitacao, EditarSolicitacao } from '../../popUps';
import VizualizarSolicitacao from '../../popUps/VizualizarSolicitacao';
import VisualizarSolicitacaoArquivado from '../../popUps/VizualizarSolicitacaoArquivado';

export default function HomeSolicitante () {
    const navigate = useNavigate();

    const [filtroNome, setFiltroNome] = useState('');
    const [tipo, setTipo] = useState('Feature');
    const [status, setStatus] = useState('Recentes');
    
    const [popupSolicitacao, setPopupSolicitacao] = useState(true);
    const [popupCriar, setPopupCriar] = useState(true);
    const [popupEditar, setPopupEditar] = useState(false);
    const [solictSelected, setSolictSelected] = useState<number>();

    const solicitacoesRaiz = [];

    // const listaStatus = ['Recentes', 'Em avaliação', 'Em produção', 'Arquivados'];
    const listaStatus = ['Recentes', 'Em Avaliação', 'Em Produção', 'Arquivados']

    const busca = (titulo: string) => {
        const regex = new RegExp(filtroNome, 'i');
        return regex.test(titulo);
    }
    
    return (
        <>
            <section className={styles.section}>
                <Header32>Minhas Solicitações</Header32>
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
                <div className={styles.botaoCriarContainer}>
                        <Botao
                        className={styles.botaoCriar}
                        handleClick={() => setPopupCriar(true)}
                        variante='contornado'>
                            Criar Solicitação
                        </Botao>
                </div>
                <ul className={styles.lista}>
                    
                    {status == 'Recentes' && <>
                        <ItemLista
                        itemName='teste'
                        handleClickName={() => setPopupSolicitacao(true)}
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
                <CriarSolicitacao aberto={popupCriar} onClose={() => setPopupCriar(false)}/>

                <VizualizarSolicitacao aberto={popupSolicitacao} onClose={() => setPopupSolicitacao(false)}/>

            </section>
        </>
    );
}