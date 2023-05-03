import styles from './SolicitacoesAdm.module.scss';
import { useEffect, useState } from 'react';
import GoogleIcon from '../../components/GoogleIcon';
import { Header32 } from '../../components/Header';
import { InputContornado } from '../../components/Inputs';
import { DropdownContornado } from '../../components/Dropdowns';
import { ItemLista } from '../../components/ItemLista';
import { AcaoNotas, AcaoProducao } from '../../components/Acoes';
import { Botao } from '../../components/Botoes';
import {
  VizualizarSolicitacao,
  VisualizarSolicitacaoAvaliacao,
  VizualizarSolicitacaoProducao,
  VizualizarSolicitacaoArquivado
} from '../../popUps';
import Solicitacoes from '../../services/Solicitacoes';

export default function SolicitacoesAdm() {
  const [busca, setBusca] = useState('');
  const [tipo, setTipo] = useState('Feature');
  const [status, setStatus] = useState('Recentes');

  const [solicitacoes, setSolicitacoes] = useState([]);

  const [solicSelecionado, setSolicSelecionado] = useState<number>();

  const [popupRecente, setPopupRecente] = useState(false);
  const [popupAvaliacao, setPopupAvaliacao] = useState(false);
  const [popupProducao, setPopupProducao] = useState(false);
  const [popupArquivado, setPopupArquivado] = useState(false);

  const listaStatus = ['Recentes', 'Em avaliação', 'Em produção', 'Arquivados']

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
          const filtroNome = filtrarNome(item.titulo);
          const filtroTipo = item.tipo == tipo;
          let filtroSituacao = item.status == status || item.status.split('.')[0] == status;
          if (status == 'Arquivados') {
            filtroSituacao = item.status == 'archived';
          }
          return filtroNome && filtroTipo && filtroSituacao;
        }));
      });
  }, [busca, tipo, status, , popupAvaliacao, popupProducao, popupArquivado]);
  return (
    <section className={styles.section}>
      <Header32>Solicitações</Header32>
      <div className={styles.inputContainer}>
        <InputContornado
          className={styles.inputPreenchimento}
          placeholder='Pesquisar Solicitação...'
          icon={<GoogleIcon>&#xe8b6;</GoogleIcon>}
          handleChange={(e) => setBusca(e.target.value)}
        />
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
      <ul className={styles.lista}>
        {status == 'Recentes' && <> {solicitacoes.map(item => (
          <ItemLista
            key={item.id}
            itemName={item.titulo}
            handleClickName={() => {
              setSolicSelecionado(item.id);
              setPopupRecente(true);
            }}
            acao={
              <span>
                {item.data_edicao ?
                  <span>
                    <span className={styles['data-texto']}>
                      Editado em
                    </span>
                    {new Date(item.data_edicao).toLocaleDateString('pt-br', {
                      day: "2-digit",
                      month: "2-digit",
                      year: "numeric",
                      hour: "numeric",
                      minute: "numeric",
                      hour12: false
                    })}
                  </span> :
                  <span>
                    <span className={styles['data-texto']}>
                      Criado em
                    </span>
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
              item.ratings.length ?
                <AcaoNotas
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
        {status == 'Arquivados' &&
          <>
            {solicitacoes.map(item => (
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
      <VizualizarSolicitacao
        idSolic={solicSelecionado}
        usuario='adm'
        aberto={popupRecente}
        onClose={() => setPopupRecente(false)}
      />
      <VisualizarSolicitacaoAvaliacao
        idSolic={solicSelecionado}
        usuario='adm'
        aberto={popupAvaliacao}
        onClose={() => setPopupAvaliacao(false)}
      />
      <VizualizarSolicitacaoProducao
        idSolic={solicSelecionado}
        usuario='adm'
        aberto={popupProducao}
        onClose={() => setPopupProducao(false)}
      />
      <VizualizarSolicitacaoArquivado
        idSolic={solicSelecionado}
        usuario='adm'
        aberto={popupArquivado}
        onClose={() => setPopupArquivado(false)}
      />
    </section>
  );
}