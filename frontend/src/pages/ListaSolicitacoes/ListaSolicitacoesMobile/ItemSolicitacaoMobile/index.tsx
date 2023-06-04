import classNames from 'classnames';
import GoogleIcon from '../../../../components/GoogleIcon';
import styles from './ItemSolicitacaoMobile.module.scss';
import { SolicitacaoProps } from '../../../../types';
import BadgeStatus from '../../../../components/BadgeStatus';

interface Props {
  solicitacao: SolicitacaoProps;
  handleClick: () => void;
  isSelecionado: boolean;
}

export default function ItemSolicitacaoMobile({ solicitacao, handleClick, isSelecionado }: Props) {
 return (
    <li
      className={classNames({
        [styles.container]: true,
        [styles[`selecionado-recente`]]: isSelecionado && solicitacao.status == 'RECENT',
        [styles[`selecionado-em-av`]]: isSelecionado && solicitacao.status == 'RATING',
        [styles[`selecionado-em-prod`]]: isSelecionado && (solicitacao.status == 'NEW' || solicitacao.status == 'ONHOLDING' || solicitacao.status == 'DONE'),
        [styles[`selecionado-arq`]]: isSelecionado && solicitacao.isArchived,
      })}
      onClick={(e) => {
        e.stopPropagation();
        handleClick();
      }}>
      <div className={styles.top}>
        <span className={styles.titulo}>
          [{solicitacao.type}] {solicitacao.title}
        </span>
        <BadgeStatus status={solicitacao.isArchived ? 'ARCHIVED' : solicitacao.status} />
      </div>
    </li>
  );
}