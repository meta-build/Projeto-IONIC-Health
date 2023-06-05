import { useEffect, useState } from 'react';
import { Aba } from '../../../../../components/Botoes';
import { RatingProps, SolicitacaoProps } from '../../../../../types';
import styles from './SolicStatusAvaliacao.module.scss';
import AvaliacaoInfo from './AvaliacaoInfo';
import Solicitacoes from '../../../../../services/Solicitacoes';
import { DropdownContornado } from '../../../../../components/Dropdowns';
import classNames from 'classnames';

interface Props {
  solic: SolicitacaoProps;
}

export default function SolicStatusAvaliacao(props: Props) {
  const [rating, setRating] = useState<RatingProps>(props.solic.ratings[0]);
  const [solicitacao, setSolicitacao] = useState<SolicitacaoProps>();

  return (
    <>
      {props.solic ?
        <>
          <div className={styles['solic-info']}>
            <span>Avaliações</span>
            <div className={styles['status-rating']}>
              <div>
                Em avaliação desde
              </div>
              <div className={styles.date}>
                {new Date(props.solic.statusRatingAt).toLocaleDateString('pt-br', {
                  day: "2-digit",
                  month: "2-digit",
                  year: "numeric",
                  hour: "numeric",
                  minute: "numeric",
                  hour12: false
                })}
              </div>
            </div>
            {props.solic.ratings.length ?
              <>
                <div
                  className={classNames({
                    [styles.dropdown]: true,
                    [styles['dropdown-container']]: true
                  })}
                >
                  <DropdownContornado
                    itens={props.solic.ratings.map(rating => (
                      { icon: <></>, label: rating.committee, value: `${rating.id}` }
                    ))}
                    handleSelected={id => setRating(props.solic.ratings.find(rating => rating.id == Number(id)))}
                  />
                </div>
                <AvaliacaoInfo rating={rating} />
              </>
              : <>
                <span className={styles['no-ratings']}>Sem avaliações</span>
              </>
            }
          </div>
        </> : <span>Carregando...</span>}
    </>
  );
}