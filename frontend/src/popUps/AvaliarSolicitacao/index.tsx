import { useEffect, useState } from "react";
import { BotaoNota, BotaoPopup, BotaoPreenchido } from "../../components/Botoes";
import PopUp from "../../components/PopUp";
import { TextBox } from "../../components/Inputs";
import styles from './AvaliarSolicitacao.module.scss';
import classNames from "classnames";
import Solicitacoes from "../../services/Solicitacoes";
import { SolicitacaoProps } from "../../types";
import { useContexto } from "../../context/contexto";

interface Props {
  aberto: boolean;
  onClose: () => void;
  idSolic: number;
}

export default function AvaliarSolicitacao(props: Props) {
  const [solicitacao, setSolicitacao] = useState({} as SolicitacaoProps);

  const [nota, setNota] = useState<number>();
  const [comentario, setComentario] = useState('');

  const { usuario } = useContexto();

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

  const avaliar = () => {
    Solicitacoes.avaliar({
      comment: comentario,
      committee: strAvaliador(usuario.grupo),
      ticketId: props.idSolic,
      value: nota
    }).then(() => {
      setNota(undefined);
      setComentario('');
      props.onClose();
    });
  }

  useEffect(() => {
    if (props.idSolic) {
      Solicitacoes.getByID(props.idSolic).then(data => {
        setSolicitacao(data);
      });
    }
  }, [props.idSolic]);
  return (
    <PopUp
      visivel={props.aberto}
      onClose={props.onClose}
      titulo={`Avaliação da ${solicitacao.tipo} ${solicitacao.titulo} em ${strAvaliador(usuario.grupo)}`}>
      <form
        className={styles.form}
        onSubmit={(e) => {
          e.preventDefault();
          avaliar();
        }}>
        <div className={styles.inputs}>
          <div className={classNames({
            [styles.input]: true,
            [styles.preencher]: true
          })}>
            <span className={styles.label}>
              Descrição
            </span>
            <span className={styles.conteudo}>
              {solicitacao.descricao}
            </span>
            <span className={styles.label}>
              Arquivos
            </span>
            <span className={styles.arquivos}>
              {solicitacao.attachments && solicitacao.attachments.map(arquivo => (
                <BotaoPreenchido
                  key={arquivo.id}
                  className={styles.arquivo}
                  handleClick={() => window.open(`http://localhost:3001${arquivo.url}`, '_blank')}>
                  {arquivo.fileName}
                </BotaoPreenchido>
              ))}
            </span>
          </div>
        </div>
        <div className={styles.row}>
          <label className={styles.item}>
            Nota:
          </label>
          <BotaoNota
            className={styles.item}
            valor={0}
            cor="cinza"
            selecionado={nota == 0}
            clicavel={true}
            handleClick={() => setNota(0)}
          />
          <BotaoNota
            className={styles.item}
            valor={1}
            cor="verde"
            selecionado={nota == 1}
            clicavel={true}
            handleClick={() => setNota(1)}
          />
          <BotaoNota
            className={styles.item}
            valor={2}
            cor="amarelo"
            selecionado={nota == 2}
            clicavel={true}
            handleClick={() => setNota(2)}
          />
          <BotaoNota
            className={styles.item}
            valor={3}
            cor="vermelho"
            selecionado={nota == 3}
            clicavel={true}
            handleClick={() => setNota(3)}
          />
        </div>
        <div className={styles['row-comentario']}>
          <label>
            Comentário
          </label>
          <TextBox
            ajustavel={false}
            className={styles['comentario-input']}
            onChange={(e) => setComentario(e.target.value)}
            valor={comentario}
          />
        </div>
        <div className={styles['row-botao']}>
          <BotaoPopup tipo="submit">
            Avaliar
          </BotaoPopup>
        </div>
      </form>
    </PopUp>
  )
}