import classNames from 'classnames';
import styles from './BotaoNota.module.scss';

interface Props {
  cor?: 'cinza' | 'verde' | 'azul1' | 'azul2' | 'amarelo' | 'vermelho';
  valor?: number;
  handleClick?: () => void;
  selecionado: boolean;
  className?: string | any;
  clicavel?: boolean
}

export default function BotaoNota(props: Props) {
  const { cor = 'cinza', clicavel = false } = props;

  return (
    <div className={props.className}>
      <button
        type='button'
        className={classNames({
          [styles.botao]: true,
          [styles[`${cor}-contorno`]]: true,
          [styles[`${cor}-preenchimento`]]: props.selecionado,
          [styles.clicavel]: clicavel,
          [props.className]: true
        })}
        onClick={props.handleClick}
      >
        {props.valor}
      </button>
    </div>
  );
}