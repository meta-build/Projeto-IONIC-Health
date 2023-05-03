import styles from './HomeAvaliador.module.scss';
import { useEffect, useState } from 'react';
import GoogleIcon from '../../components/GoogleIcon';
import { Header32 } from '../../components/Header';
import { InputContornado } from '../../components/Inputs';
import { DropdownContornado } from '../../components/Dropdowns';
import { ItemLista } from '../../components/ItemLista';
import { AcaoNotas } from '../../components/Acoes';
import { Botao } from '../../components/Botoes';
import { VisualizarSolicitacaoAvaliacao } from '../../popUps';
import Solicitacoes from '../../services/Solicitacoes';
import { useContexto } from '../../context/contexto';
import { SolicitacaoProps } from '../../types';

export default function HomeAvaliador() {
  const [busca, setBusca] = useState('');
  const [tipo, setTipo] = useState('Feature');
  const [status, setStatus] = useState('Sem nota de Risco');

  const [popup, setPopup] = useState(false);

  const [solicitacoes, setSolicitacoes] = useState([]);
  const [solicSelecionado, setSolicSelecionado] = useState<number>();

  const { usuario } = useContexto();

  const filtrarNome = (titulo: string) => {
    const regex = new RegExp(busca, 'i');
    return regex.test(titulo);
  }

  const strAvaliador = (grupoId: number) => {
    switch (grupoId) {
      case 3:
        return 'Risco';
      case 4:
        return 'Custo';
      default:
        return 'Impacto';
    }
  }

  const filtrarSemNota = (solicitacao: SolicitacaoProps) => {
    const notas = solicitacao.ratings;
    let result = true;
    notas.forEach(nota => {
      if (nota.committee == strAvaliador(usuario.grupo)) {
        result = false;
      }
    });
    return result;
  }

  useEffect(() => {
    Solicitacoes.getAll()
      .then(data => {
        setSolicitacoes(data.filter(item => {
          const filtroNome = filtrarNome(item.titulo);
          const filtroTipo = item.tipo == tipo;
          let filtroSituacao = filtrarSemNota(item);
          if (status == 'Todos') {
            filtroSituacao = true
          }
          return filtroNome && filtroTipo && filtroSituacao;
        }));
      });
  }, [busca, tipo, status, popup]);
  return (
    <>
      <section className={styles.section}>
        <Header32>Solicitações para avaliar</Header32>
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
          <Botao
            className={styles.botao}
            handleClick={() => setStatus(`Sem nota de ${strAvaliador(usuario.grupo)}`)}
            variante={`Sem nota de ${strAvaliador(usuario.grupo)}` == status ? 'preenchido' : 'contornado'}>
            {`Sem nota de ${strAvaliador(usuario.grupo)}`}
          </Botao>
          <Botao
            className={styles.botao}
            handleClick={() => setStatus(`Todos`)}
            variante={`Todos` == status ? 'preenchido' : 'contornado'}>
            {`Todos`}
          </Botao>
        </div>
        <ul className={styles.lista}>
          {solicitacoes && solicitacoes.map(item => (
            <ItemLista
              key={item.id}
              itemName={item.titulo}
              handleClickName={() => {
                setSolicSelecionado(item.id);
                setPopup(true);
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
        </ul>
        <VisualizarSolicitacaoAvaliacao
          idSolic={solicSelecionado}
          usuario='avaliador'
          aberto={popup}
          onClose={() => setPopup(false)}
        />
      </section>
    </>
  );
}