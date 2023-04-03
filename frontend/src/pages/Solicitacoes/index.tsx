import { useEffect, useState } from 'react';
import GoogleIcon from '../../components/GoogleIcon';
import { Header32 } from '../../components/Header';
import InputContornado from '../../components/InputContornado';
import styles from './Solicitacoes.module.scss';
import DropdownContornado from '../../components/DropdownContornado';
import DropdownItem from '../../types/DropdownItem';
import { Botao } from '../../components/Botao';
import ItemLista from '../../components/ItemLista';
import AcaoEditarExcluir from '../../components/ItemLista/ItemAcoes/AcaoEditarExcluir';
import AcaoNotas from '../../components/ItemLista/ItemAcoes/AcaoNotas';
import AcaoProducao from '../../components/ItemLista/ItemAcoes/AcaoProducao';
import { useNavigate } from 'react-router-dom';
import Voltar from '../../components/Voltar';

export default function Solicitacoes () {
    const navigate = useNavigate();

    const [filtroNome, setFiltroNome] = useState('');
    const [tipo, setTipo] = useState('Feature');
    const [status, setStatus] = useState('Recentes');
    const [solicitacoes, setSolicitacoes] = useState<Object[]>([]);

    const solicitacoesRaiz = [
        { nome: 'solicitação 1a', tipo: 'Feature', status: {nome: 'Recentes'} },
        { nome: 'solicitação 2a', tipo: 'Hotfix', status: {nome: 'Recentes'} },
        { nome: 'solicitação 3a', tipo: 'Feature', status: {nome: 'Arquivados'} },
        { nome: 'solicitação 4a', tipo: 'Hotfix', status: {nome: 'Arquivados'} },
        { nome: 'solicitação 5a', tipo: 'Feature', status: {nome: 'Em avaliação', risco: undefined, impacto: 2, custo: 3} },
        { nome: 'solicitação 6a', tipo: 'Hotfix', status: {nome: 'Em avaliação', custo: 1} },
        { nome: 'solicitação 7a', tipo: 'Feature', status: {nome: 'Em produção', status: "New"} },
        { nome: 'solicitação 8a', tipo: 'Hotfix', status: {nome: 'Em produção', status: "On Holding"} },
        { nome: 'solicitação 1b', tipo: 'Feature', status: {nome: 'Recentes'} },
        { nome: 'solicitação 2b', tipo: 'Hotfix', status: {nome: 'Recentes'} },
        { nome: 'solicitação 3b', tipo: 'Feature', status: {nome: 'Arquivados'} },
        { nome: 'solicitação 4b', tipo: 'Hotfix', status: {nome: 'Arquivados'} },
        { nome: 'solicitação 5b', tipo: 'Feature', status: {nome: 'Em avaliação', risco: 1, impacto: 2, custo: 3} },
        { nome: 'solicitação 6b', tipo: 'Hotfix', status: {nome: 'Em avaliação', custo: 3} },
        { nome: 'solicitação 7b', tipo: 'Feature', status: {nome: 'Em produção', status: "Done"} },
        { nome: 'solicitação 8b', tipo: 'Hotfix', status: {nome: 'Em produção', status: "On Holding"} },
    ];

    // const listaStatus = ['Recentes', 'Em avaliação', 'Em produção', 'Arquivados'];
    const listaStatus = ['Recentes', 'Arquivados']

    const busca = (titulo: string) => {
        const regex = new RegExp(filtroNome, 'i');
        return regex.test(titulo);
    }

    useEffect(() => {
      let sTemp = solicitacoesRaiz.filter(s => {
        let booleanNome = busca(s.nome);
        let booleanTipo = s.tipo == tipo;
        let booleanStatus = s.status.nome == status;
        return booleanTipo && booleanStatus && booleanNome;
      }); 
      setSolicitacoes(sTemp);
    }, [filtroNome, tipo, status]);
    
    return (
        <>
            <Voltar />
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
                    {listaStatus.map(s => (
                        <Botao
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
                        handleClick={() => navigate('/nova-solicitacao')}
                        variante='contornado'>
                            Criar Solicitação
                        </Botao>
                </div>
                <ul className={styles.lista}>
                    {solicitacoes.map(s => (
                        <ItemLista
                        itemName={s['nome']}
                        handleClickName={() => console.log(s['nome'])}
                        acao={
                        s['status']['nome'] == 'Recentes' ?
                        <AcaoEditarExcluir
                        onDelete={() => console.log('foidelete')}
                        onEdit={() => console.log('foiedit')} /> :
                        (s['status']['nome'] == 'Em avaliação' ?
                        (s['tipo'] == 'Hotfix' ?
                        <AcaoNotas notaCusto={s['status']['custo']} /> :
                        <AcaoNotas
                        notaRisco={s['status']['risco']}
                        notaImpacto={s['status']['impacto']}
                        notaCusto={s['status']['custo']} />)
                        : (s['status']['nome'] == 'Em produção' ?
                        <AcaoProducao status={s['status']['status']} /> :
                        <></>))} />
                    ))}
                </ul>
            </section>
        </>
    );
}