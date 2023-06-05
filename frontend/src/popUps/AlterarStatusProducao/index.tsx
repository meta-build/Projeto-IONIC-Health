import styles from './AlterarStatusProducao.module.scss';
import { useEffect, useState } from "react";
import PopUp from "../../components/PopUp";
import classNames from "classnames";
import { BotaoPreenchido } from "../../components/Botoes";
import { DropdownPreenchido } from "../../components/Dropdowns";
import Solicitacoes from "../../services/Solicitacoes";
import { SolicitacaoProps } from "../../types";
import PopupConfirm from '../PopupConfirm';
import PopupErro from '../PopupErro';
import PopupCarregando from '../PopupCarregando';

interface Props {
  aberto: boolean;
  onClose: () => void;
  idSolic: number;
  onChange?: () => void;
}

export default function AlterarStatusProducao(props: Props) {
  const [solicitacao, setSolicitacao] = useState({} as SolicitacaoProps);
  const [status, setStatus] = useState('');

  const [sucesso, setSucesso] = useState(false);
  const [falha, setFalha] = useState(false);
  const [carregando, setCarregando] = useState(false);

  const strStatus = (status: string): "NEW" | "RECENT" | "RATING" | "ONHOLDING" | "DONE" => {
    switch (status) {
      case 'New':
        return 'NEW';
      case 'On Holding':
        return 'ONHOLDING';
      default:
        return 'DONE';
    }
  }

  const getStatus = (status: "NEW" | "RECENT" | "RATING" | "ONHOLDING" | "DONE") => {
    switch (status) {
      case 'NEW':
        return 'New';
      case 'ONHOLDING':
        return 'On Holding';
      default:
        return 'DONE';
    }
  }

  const avaliar = () => {
    setCarregando(true);
    Solicitacoes.atualizar(props.idSolic, {
      title: solicitacao.title,
      description: solicitacao.description,
      assignedRoleId: solicitacao.assignedRoleId,
      isArchived: solicitacao.isArchived,
      status: strStatus(status)
    }).then(() => {
      setCarregando(false);
      setSucesso(true);
    }).catch(() => {
      setCarregando(false);
      setFalha(true);
    })
  }

  useEffect(() => {
    if (props.idSolic) {
      Solicitacoes.getByID(props.idSolic).then(data => {
        setSolicitacao(data);
        setStatus(getStatus(data.status));
      });
    }
  }, [props.idSolic]);
  return (
    <>
      <PopUp
        titulo={`Alterar status de produção`}
        visivel={props.aberto}
        onClose={props.onClose} >
        <form
          onSubmit={(e) => {
            e.preventDefault();
            avaliar();
          }}
          className={styles.form}>
          <div className={styles.inputs}>
            <div
              className={classNames({
                [styles.input]: true,
                [styles.preencher]: true
              })}
            >
              <div className={styles.producao}>
                <span className={styles.label}>Status de produção</span>
                <span className={styles['producao-status']}>
                  <label>Status:</label>
                  <DropdownPreenchido
                    itens={['New', 'On Holding', 'Done']}
                    selecionadoFst={status}
                    handleSelected={(s) => setStatus(s)}
                  />
                </span>
              </div>
              <div className={styles['linha-submit']} id='desktop'>
                <BotaoPreenchido
                  className={styles.botao}
                  handleClick={() => props.onClose()}>
                  Cancelar
                </BotaoPreenchido>
                <BotaoPreenchido
                  className={classNames({
                    [styles.botao]: true,
                    [styles['botao-submit']]: true
                  })}
                  tipo="submit">
                  Alterar
                </BotaoPreenchido>
              </div>
              <div
              id='mobile'
              className={classNames({
                [styles['linha-submit']]: true,
                [styles['linha-mobile']]: true
              })}>
                <BotaoPreenchido
                  className={classNames({
                    [styles.botao]: true,
                    [styles['botao-mobile']]: true,
                    [styles['botao-submit']]: true
                  })}
                  tipo="submit">
                  Alterar
                </BotaoPreenchido>
                <BotaoPreenchido
                  className={classNames({
                    [styles.botao]: true,
                    [styles['botao-mobile']]: true
                  })}
                  handleClick={() => props.onClose()}>
                  Cancelar
                </BotaoPreenchido>
              </div>
            </div>
          </div>
        </form>
      </PopUp>
      <PopupCarregando visivel={carregando} />
      <PopupConfirm
        visivel={sucesso}
        onClose={() => {
          setSucesso(false);
          props.onChange();
        }}
        titulo='Status de produção alterado com sucesso'
        descricao=''
      />
      <PopupErro
        visivel={falha}
        onClose={() => {
          setFalha(false);
        }}
        titulo='Erro ao alterar status de produção'
        descricao='Não foi possível alterar o status de produção por conta de um erro interno do servidor, tente novamente mais tarde.'
      />
    </>
  );
}