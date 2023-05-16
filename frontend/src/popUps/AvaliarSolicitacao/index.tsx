import { useEffect, useState } from "react";
import { BotaoNota, BotaoPopup, BotaoPreenchido } from "../../components/Botoes";
import PopUp from "../../components/PopUp";
import { TextBox } from "../../components/Inputs";
import styles from './AvaliarSolicitacao.module.scss';
import classNames from "classnames";
import Solicitacoes from "../../services/Solicitacoes";
import { SolicitacaoProps } from "../../types";
import { useContexto } from "../../context/contexto";
import PopupConfirm from "../PopupConfirm";
import PopupErro from "../PopupErro";

interface Props {
  aberto: boolean;
  onClose: () => void;
  idSolic: number;
}

export default function AvaliarSolicitacao(props: Props) {
  const [solicitacao, setSolicitacao] = useState({} as SolicitacaoProps);

  const [nota, setNota] = useState<number>();
  const [comentario, setComentario] = useState('');

  const [carregando, setCarregando] = useState(false);
  const [falha, setFalha] = useState(false);
  const [sucesso, setSucesso] = useState(false);

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
    setCarregando(true);
    Solicitacoes.avaliar({
      comment: comentario,
      committee: usuario.role.name,
      ticketId: props.idSolic,
      value: nota
    }).then(() => {
      setCarregando(false);
      setNota(undefined);
      setComentario('');
      setSucesso(true);
    })
      .catch(() => {
        setCarregando(false);
        setFalha(true);
      })
  }

  useEffect(() => {
    if (props.idSolic) {
      Solicitacoes.getByID(props.idSolic).then(data => {
        setSolicitacao(data);
      });
    }
  }, [props.idSolic]);
  return (
    <>
      <PopUp
        visivel={props.aberto}
        onClose={props.onClose}
        titulo={`Avaliar solicitação`}>
        <form
          className={styles.form}
          onSubmit={(e) => {
            e.preventDefault();
            avaliar();
          }}>
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
      <PopupConfirm
        visivel={sucesso}
        onClose={() => {
          setSucesso(false);
          props.onClose();
        }}
        titulo='Solicitação avaliada com sucesso'
        descricao=''
      />
      <PopupErro
        visivel={falha}
        onClose={() => {
          setFalha(false);
          props.onClose();
        }}
        titulo='Erro ao avaliar solicitação'
        descricao='Não foi possível avaliar a solicitação por conta de um erro interno do servidor, tente novamente mais tarde.'
      />
    </>
  )
}