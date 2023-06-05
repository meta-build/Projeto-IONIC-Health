import { useEffect, useState } from "react";
import PopUp from "../../components/PopUp";
import { BotaoPreenchido } from "../../components/Botoes";
import styles from './AprovarParaProducao.module.scss';
import classNames from "classnames";
import { GrupoProps, SolicitacaoProps } from "../../types";
import Solicitacoes from "../../services/Solicitacoes";
import { DropdownPreenchido } from "../../components/Dropdowns";
import Grupos from "../../services/Grupos";
import PopupConfirm from "../PopupConfirm";
import PopupErro from "../PopupErro";
import PopupCarregando from "../PopupCarregando";

interface Props {
  aberto: boolean;
  onClose: () => void;
  onConfirm: () => void;
  idSolic: number;
}

export default function AprovarParaProducao(props: Props) {
  const [solicitacao, setSolicitacao] = useState({} as SolicitacaoProps);

  const [grupos, setGrupos] = useState<GrupoProps[]>([]);
  const [grupoSelec, setGrupoSelect] = useState<GrupoProps>();

  const [erro, setErro] = useState(false);

  const [sucesso, setSucesso] = useState(false);
  const [falha, setFalha] = useState(false);

  const [carregando, setCarregando] = useState(false);

  const aprovar = () => {
    if (grupoSelec) {
      setCarregando(true)
      Solicitacoes.atualizar(props.idSolic, {
        title: solicitacao.title,
        description: solicitacao.description,
        isArchived: solicitacao.isArchived,
        status: 'NEW',
        assignedRoleId: grupoSelec.id
      }).then(() => {
        setCarregando(false);
        setSucesso(true);
      }).catch(() => {
        setCarregando(false);
        setFalha(true);
      })
    } else {
      setErro(true);
    }
  }

  useEffect(() => {
    if (props.idSolic) {
      Solicitacoes.getByID(props.idSolic).then(data => {
        setSolicitacao(data);
        console.log(data);
      });
      Grupos.getAll().then((grupos) => {
        setGrupos(grupos.filter(grupo => {
          return Boolean(grupo.permissions.find(perm => perm.id == 13))
        }));
      })
    }
  }, [props.idSolic]);
  return (
    <>
      <PopUp
        visivel={props.aberto}
        onClose={() => {
          setGrupoSelect(undefined)
          setErro(false);
          props.onClose();
        }}
        titulo={`Liberação solicitação para produção`}>
        <span className={styles.aviso} id='desktop'>
          <div>
            Grupo de produção:
          </div>
          <DropdownPreenchido
            className={classNames({
              [styles.erro]: erro
            })}
            itens={grupos.map(grupo => grupo.name)}
            handleSelected={(nome) => setGrupoSelect(grupos.find(grupo => grupo.name == nome))}
            onOpen={() => setErro(false)}
            selecionadoFst={grupoSelec ? grupoSelec.name : ''}
          />
        </span>
        <span className={classNames({
          [styles.aviso]: true,
          [styles['aviso-mobile']]: true
        })} id='mobile'>
          <div>
            Grupo de produção:
          </div>
          <DropdownPreenchido
            className={classNames({
              [styles.dropdown]: true,
              [styles.erro]: erro
            })}
            itens={grupos.map(grupo => grupo.name)}
            handleSelected={(nome) => setGrupoSelect(grupos.find(grupo => grupo.name == nome))}
            onOpen={() => setErro(false)}
            selecionadoFst={grupoSelec ? grupoSelec.name : ''}
          />
        </span>
        <div className={styles.botoes} id='desktop'>
          <BotaoPreenchido
            handleClick={props.onClose}
            className={styles.botao}>
            CANCELAR
          </BotaoPreenchido>
          <BotaoPreenchido
            handleClick={() => {
              aprovar();
            }}
            className={classNames({
              [styles.botao]: true,
              [styles.confirmar]: true
            })}>
            CONFIRMAR
          </BotaoPreenchido>
        </div>
        <div className={classNames({
          [styles.botoes]: true,
          [styles['botoes-mobile']]: true
        })} id='mobile'>
          <BotaoPreenchido
            handleClick={props.onClose}
            className={styles.botao}>
            CANCELAR
          </BotaoPreenchido>
          <BotaoPreenchido
            handleClick={() => {
              aprovar();
            }}
            className={classNames({
              [styles.botao]: true,
              [styles.confirmar]: true
            })}>
            CONFIRMAR
          </BotaoPreenchido>
        </div>
      </PopUp>
      <PopupCarregando visivel={carregando} />
      <PopupConfirm
        visivel={sucesso}
        onClose={() => {
          setGrupoSelect(undefined);
          setSucesso(false);
          props.onClose();
        }}
        titulo='Solicitação liberada para produção'
        descricao='Solicitação liberada para produção com sucesso.'
      />
      <PopupErro
        visivel={falha}
        onClose={() => {
          setFalha(false);
        }}
        titulo='Erro ao liberar para produção'
        descricao='Não foi possível liberar a solicitação para produção por conta de um erro interno do servidor, tente novamente mais tarde.'
      />
    </>
  );
}