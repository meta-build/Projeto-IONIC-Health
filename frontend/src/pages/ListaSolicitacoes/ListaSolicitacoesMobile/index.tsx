import classNames from "classnames";
import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Botao } from "../../../components/Botoes";
import { DropdownContornado } from "../../../components/Dropdowns";
import GoogleIcon from "../../../components/GoogleIcon";
import { Header32 } from "../../../components/Header";
import { InputContornado } from "../../../components/Inputs";
import ItemSolicitacao from "../../../components/ItemSolicitacao";
import { useContexto } from "../../../context/contexto";
import Grupos from "../../../services/Grupos";
import Solicitacoes from "../../../services/Solicitacoes";
import { SolicitacaoProps, GrupoProps } from "../../../types";
import styles from './ListaSolicitacoesMobile.module.scss';

export default function ListaSolicitacoesMobile(){
  const navigate = useNavigate();
  const nav = useNavigate();
  const loc = useLocation();
  const { usuario } = useContexto();

  const [busca, setBusca] = useState('');
  const [tipo, setTipo] = useState('Todos');
  const [status, setStatus] = useState('Todos');
  const [situacaoNota, setSituacaoNota] = useState('semNota')

  const [solicitacoes, setSolicitacoes] = useState([]);
  const [solicSelecionada, setSolicSelecionada] = useState<SolicitacaoProps>();
  const [grupoSolic, setGrupoSolic] = useState<GrupoProps>();


  const filtrarNome = (titulo: string) => {
    const regex = new RegExp(busca, 'i');
    return regex.test(titulo);
  }

  const strSituacao = (situacao: string) => {
    switch (situacao) {
      case 'Recentes': return 'RECENT';
      case 'Em avaliação': return 'RATING';
      case 'RECENT': return 'Recente';
      case 'RATING': return 'Em avaliação';
      case 'NEW': return 'Em produção';
      case 'ONHOLDING': return 'Em produção';
      case 'DONE': return 'Em produção';

    }
  }

  const isSemNota = (solic: SolicitacaoProps): boolean => {
    const notas = solic.ratings
    return Boolean(!notas.find(nota => nota.committee == usuario.role.name));
  }

  const getSolicitacoes = () => {
    console.log(usuario)
    Solicitacoes.getAll()
      .then(data => {
        setSolicitacoes(data.filter((item: SolicitacaoProps) => {
          const filtroNota = loc.pathname == '/solicitacoes-para-avaliar' ?
            (situacaoNota == 'semNota' ?
              (!item.ratings.find(rating => rating.committee == usuario.role.name)) : true)
            : true;
          const filtroDono = loc.pathname == '/minhas-solicitacoes' ?
            item.requesterId == usuario.id : true;
          const filtroAv = loc.pathname == '/solicitacoes-para-avaliar' ?
            (item.status == 'RATING' && !item.isArchived) : true;
          const filtroProd = loc.pathname == '/solicitacoes-em-producao' ?
            !item.isArchived && item.assignedRoleId && item.assignedRoleId == usuario.role.id : true;
          const filtroNome = filtrarNome(item.title);
          const filtroTipo = tipo == 'Todos' ? true : item.type == tipo.toUpperCase();
          let filtroSituacao = status == 'Todos' ? true : item.status == strSituacao(status);
          if (status == 'Em produção') {
            filtroSituacao = !item.isArchived && (item.status == 'NEW' || item.status == 'ONHOLDING' || item.status == 'DONE');
          }
          if (status == 'Arquivados') {
            filtroSituacao = item.isArchived;
          }
          return filtroNome && filtroTipo && filtroSituacao && filtroAv && filtroProd && filtroDono && filtroNota;
        }));
      });
    }
    useEffect(() => {
        getSolicitacoes();
    }, [busca, tipo, status, situacaoNota, loc.pathname]);

    const handleVoltar = () => {
      navigate(-1);
    };
  
    return (
    <section id='mobile'>
        <div className={styles.listContainer}>
        
            <Header32 className={styles.titulo}>
            <button 
                className={styles.botaoVoltar} 
                onClick={handleVoltar} 
            >
                {/* <FaArrowLeft className="icone-seta" /> */}
                <GoogleIcon className={styles['icone-seta']}>&#xe5cb;</GoogleIcon>
                <span className={styles.textoVoltar}>Voltar</span>
            </button> 

                {loc.pathname == '/solicitacoes' ? 'Solicitações' :
                loc.pathname == '/minhas-solicitacoes' ? 'Minhas solicitações' :
                loc.pathname == '/solicitacoes-para-avaliar' ? 'Solicitações para avaliar' :
              'Solicitações em produção'}
            </Header32>

        <section className={styles.section}>
        <div className={styles.esquerda}>
          <div className={styles.inputContainer}>
            <InputContornado
              className={styles.inputPreenchimento}
              placeholder='Pesquisar solicitação...'
              icon={<GoogleIcon>&#xe8b6;</GoogleIcon>}
              handleChange={(e) => setBusca(e.target.value)}
            />
            <div className={styles.inputTipo}>     
            <DropdownContornado
                className={classNames({
                  [styles.inputPreenchimento]: loc.pathname !== '/solicitacoes-para-avaliar'
                })}
                itens={[
                  { label: 'Tipo: Todos', icon: <GoogleIcon>&#xEB75;</GoogleIcon> },
                  { label: 'Tipo: Feature', icon: <GoogleIcon>&#xE8B8;</GoogleIcon> },
                  { label: 'Tipo: Hotfix', icon: <GoogleIcon>&#xf10b;</GoogleIcon> }
                ]}
                handleSelected={(s: string) => setTipo(s.split(' ')[1])}
              />
               </div>
            <div className={styles.inputRow}>
             
              {loc.pathname == '/solicitacoes-para-avaliar' ?
                <DropdownContornado
                  className={styles.inputPreenchimento}
                  itens={[
                    { label: `Situação: Sem nota de ${usuario.role.name}`, icon: <GoogleIcon>&#xE46E;</GoogleIcon>, value: 'semNota' },
                    { label: 'Situação: Todos', icon: <GoogleIcon>&#xEB75;</GoogleIcon>, value: 'Todos' }
                  ]}
                  handleSelected={(s: string) => setSituacaoNota(s)}
                /> : loc.pathname !== '/solicitacoes-em-producao' &&
                <DropdownContornado
                  className={styles.inputPreenchimento}
                  itens={[
                    { label: 'Status: Todos', icon: <GoogleIcon>&#xEB75;</GoogleIcon>, value: 'Todos' },
                    { label: 'Status: Recentes', icon: <GoogleIcon>&#xE8B5;</GoogleIcon>, value: 'Recentes' },
                    { label: 'Status: Em avaliação', icon: <GoogleIcon>&#xE46E;</GoogleIcon>, value: 'Em avaliação' },
                    { label: 'Status: Em produção', icon: <GoogleIcon>&#xE179;</GoogleIcon>, value: 'Em produção' },
                    { label: 'Status: Arquivados', icon: <GoogleIcon>&#xE2C8;</GoogleIcon>, value: 'Arquivados' }
                  ]}
                  handleSelected={(s: string) => setStatus(s)}
                />
              }
            </div>
          </div>
          {loc.pathname == '/minhas-solicitacoes' &&
            <div className={styles.inputContainer}>
              <Botao
                handleClick={() => {
                  nav('/criar-solicitacao');
                }}
                className={styles.botao}>
                Criar solicitação
              </Botao>
            </div>}



          {/* {loc.pathname == '/detalhes-solicitacao' && */}
          <div className={styles.listContainer2}
            onClick={() => setSolicSelecionada(undefined)}
            >
            {solicitacoes.length ?
              solicitacoes.map(solic => (
                <ItemSolicitacao
                  key={solic.id}
                  solicitacao={solic}
                  handleClick={() => {
                    setSolicSelecionada(solic);
                    Solicitacoes.getByID(solic.id).then(solicitacao => {
                      setSolicSelecionada(solicitacao);
                    });
                    solic.assignedRoleId && Grupos.getByID(solic.assignedRoleId).then(grupo => {
                      setGrupoSolic(grupo);
                    })
                  }}
                  isSelecionado={solicSelecionada ? solic.id == solicSelecionada.id : false} />
              )) : <span className={styles['not-found']}>Nenhuma solicitação encontrada.</span>}
          </div>
          {/* } */}
        </div>  
        </section>
        </div>
    </section>
    );
}
