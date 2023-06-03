import { useEffect, useState } from 'react';
import { Aba } from '../../../../components/Botoes';
import { RatingProps, SolicitacaoProps } from '../../../../types';
import styles from './SolicStatusAvaliacao.module.scss';
import AvaliacaoInfo from './AvaliacaoInfo';
import Solicitacoes from '../../../../services/Solicitacoes';

interface Props {
  solic: SolicitacaoProps;
}

export default function SolicStatusAvaliacao(props: Props) {
  const [rating, setRating] = useState<RatingProps>();
  const [solicitacao, setSolicitacao] = useState<SolicitacaoProps>();

  useEffect(() => {
    Solicitacoes.getByID(props.solic.id)
    .then(solic => {
      setSolicitacao(solic);
      setRating(solic.ratings[0]);
    })
  }, [props.solic]);
  return (
    <div className={styles['solic-info']}>
      <span>Avaliações</span>
      <div className={styles['status-rating']}>
        <div>
          Em avaliação desde
        </div>
        <div className={styles.date}>
          {new Date().toLocaleDateString('pt-br', {
            day: "2-digit",
            month: "2-digit",
            year: "numeric",
            hour: "numeric",
            minute: "numeric",
            hour12: false
          })}
        </div>
      </div>
      {rating &&
        <>
          <div className={styles.abas}>
            {props.solic.ratings.map(av => (
              <Aba
                key={av.id}
                isActive={av.id == rating.id}
                handleClick={() => setRating(av)}>
                {av.committee}
              </Aba>
            ))}
          </div>
          <AvaliacaoInfo rating={rating} />
        </>
      }
    </div>
  );
}