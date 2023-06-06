import { RatingProps} from '../../../../../types';
import styles from './AvaliacaoInfo.module.scss';
import { BotaoNota } from '../../../../../components/Botoes';

interface Props {
  rating: RatingProps;
}

export default function AvaliacaoInfo(props: Props) {

  const getColorValue = (nota: number): "vermelho" | "cinza" | "verde" | "azul1" | "azul2" | "amarelo" => {
    switch (nota) {
      case 0: return 'cinza';
      case 1: return 'verde';
      case 2: return 'amarelo';
      case 3: return 'vermelho';
    }
  }

  return (
    <div className={styles.container}>
      <div className={styles.row}>
        <span>Avaliador:</span>
        <span className={styles.info}>{props.rating.user.name}</span>
      </div>
      <div className={styles.row}>
        <span>Avaliação feita em</span>
        <span className={styles.info}>
          {new Date(props.rating.createdAt).toLocaleDateString('pt-br', {
            day: "2-digit",
            month: "2-digit",
            year: "numeric",
            hour: "numeric",
            minute: "numeric",
            hour12: false
          })}
        </span>
      </div>
      <div className={styles.row}>
        <span>Nota:</span>
        <BotaoNota
          className={styles.item}
          valor={props.rating.value}
          cor={getColorValue(props.rating.value)}
          selecionado={true}
          clicavel={true}
        />
      </div>
      <div>Comentário</div>
      <div className={styles.comment}>
        {props.rating.comment}
      </div>
    </div>
  );
}