import styles from './HomeSolicitante.module.scss';
import { useEffect, useState } from 'react';
import GoogleIcon from '../../components/GoogleIcon';
import { Header32 } from '../../components/Header';
import { InputContornado } from '../../components/Inputs';
import { DropdownContornado } from '../../components/Dropdowns';
import { ItemLista } from '../../components/ItemLista';
import { AcaoNotas, AcaoProducao } from '../../components/Acoes';
import { Botao } from '../../components/Botoes';
import {
  CriarSolicitacao,
  VizualizarSolicitacao,
  VizualizarSolicitacaoArquivado,
  VizualizarSolicitacaoProducao,
  VisualizarSolicitacaoAvaliacao
} from '../../popUps';
import Solicitacoes from '../../services/Solicitacoes';
import { useContexto } from '../../context/contexto';

export default function HomeSolicitante() {
  const [busca, setBusca] = useState('');
  const [tipo, setTipo] = useState('Feature');
  const [status, setStatus] = useState('Recentes');

  const [popupCriar, setPopupCriar] = useState(false);
  const [popupRecente, setPopupRecente] = useState(false);
  const [popupAvaliacao, setPopupAvaliacao] = useState(false);
  const [popupArquivado, setPopupArquivado] = useState(false);
  const [popupProducao, setPopupProducao] = useState(false);

  const [solicitacoes, setSolicitacoes] = useState([]);
  const [solicSelecionado, setSolicSelecionado] = useState<number>();

  const { usuario } = useContexto();

  const listaStatus = ['Recentes', 'Em avaliação', 'Em produção', 'Arquivados'];

  const producaoMask = {
    'New': 'new',
    'On Holding': 'on-holding',
    'Done': 'done'
  }

  const filtrarNome = (titulo: string) => {
    const regex = new RegExp(busca, 'i');
    return regex.test(titulo);
  }

  useEffect(() => {
    Solicitacoes.getAll()
      .then(data => {
        setSolicitacoes(data.filter(item => {
          const filtroUsuario = usuario.id == item['id_user'];
          const filtroNome = filtrarNome(item.titulo);
          const filtroTipo = item.tipo == tipo;
          let filtroSituacao = item.status == status || item.status.split('.')[0] == status;
          if (status == 'Arquivados') {
            filtroSituacao = item.status == 'archived';
          }
          return filtroUsuario && filtroNome && filtroTipo && filtroSituacao;
        }));
      });;
  }, [busca, tipo, status, popupCriar, popupAvaliacao, popupProducao, popupArquivado]);
  return (
    <>
      <section className={styles.section}>
        <Header32>Minhas Solicitações</Header32>
        <div className={styles.inputContainer}>
          <InputContornado
            className={styles.inputPreenchimento}
            placeholder='Pesquisar Solicitação...'
            icon={<GoogleIcon>&#xe8b6;</GoogleIcon>}
            handleChange={(e) => setBusca(e.target.value)} />
          <DropdownContornado
            itens={[
              { label: 'Feature', icon: <GoogleIcon>&#xE8B8;</GoogleIcon> },
              { label: 'Hotfix', icon: <GoogleIcon>&#xf10b;</GoogleIcon> }
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
          {status == 'Recentes' && <> {solicitacoes.map(item => (
            <ItemLista
              key={item.id}
              itemName={item.titulo}
              handleClickName={() => {
                setSolicSelecionado(item.id);
                setPopupRecente(true);
              }}
              acao={<span>
                {item.data_edicao ? <span> <span className={styles['data-texto']}>Editado em</span>
                  {new Date(item.data_edicao).toLocaleDateString('pt-br', {
                    day: "2-digit",
                    month: "2-digit",
                    year: "numeric",
                    hour: "numeric",
                    minute: "numeric",
                    hour12: false
                  })}
                </span> : <span> <span className={styles['data-texto']}>Criado em</span>
                  {new Date(item.data_criacao).toLocaleDateString('pt-br', {
                    day: "2-digit",
                    month: "2-digit",
                    year: "numeric",
                    hour: "numeric",
                    minute: "numeric",
                    hour12: false
                  })}
                </span>}
              </span>} />
          ))}
          </>}
          {status == 'Em avaliação' && <> {solicitacoes.map(item => (
            <ItemLista
              key={item.id}
              itemName={item.titulo}
              handleClickName={() => {
                setSolicSelecionado(item.id);
                setPopupAvaliacao(true);
              }}
              acao={
                item.ratings.length ? <AcaoNotas
                  notas={item.ratings.map(av => ({
                    nota: av.value,
                    comite: av.committee
                  }))}
                  notaPreenchida={true}
                /> :
                  <span>Sem avaliações</span>
              } />
          ))}
          </>}
          {status == 'Em produção' && <> {solicitacoes.map(item => (
            <ItemLista
              key={item.id}
              itemName={item.titulo}
              handleClickName={() => {
                setSolicSelecionado(item.id);
                setPopupProducao(true);
              }}
              acao={<AcaoProducao status={producaoMask[item.status.split('.')[1]]} />} />
          ))}
          </>}
          {status == 'Arquivados' && <> {solicitacoes.map(item => (
            <ItemLista
              key={item.id}
              itemName={item.titulo}
              handleClickName={() => {
                setSolicSelecionado(item.id);
                setPopupArquivado(true);
              }}
              acao={
                <span>
                  Arquivado em {new Date(item.data_arquivado).toLocaleDateString('pt-br', {
                    day: "2-digit",
                    month: "2-digit",
                    year: "numeric",
                    hour: "numeric",
                    minute: "numeric",
                    hour12: false
                  })}
                </span>} />
          ))}
          </>}
        </ul>
        <CriarSolicitacao
          aberto={popupCriar}
          onClose={() => setPopupCriar(false)}
        />
        <VizualizarSolicitacao
          idSolic={solicSelecionado}
          usuario='solicitante'
          aberto={popupRecente}
          onClose={() => setPopupRecente(false)}
        />
        <VisualizarSolicitacaoAvaliacao
          idSolic={solicSelecionado}
          usuario='solicitante'
          aberto={popupAvaliacao}
          onClose={() => setPopupAvaliacao(false)}
        />
        <VizualizarSolicitacaoArquivado
          idSolic={solicSelecionado}
          usuario='solicitante'
          aberto={popupArquivado}
          onClose={() => setPopupArquivado(false)}
        />
        <VizualizarSolicitacaoProducao
          idSolic={solicSelecionado}
          usuario='solicitante'
          aberto={popupProducao}
          onClose={() => setPopupProducao(false)}
        />
      </section>
    </>
  );
}