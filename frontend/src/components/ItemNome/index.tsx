import classNames from 'classnames';
import styles from './ItemNome.module.scss';

interface Props {
  nome: string;
  desc?: string;
  handleClick: () => void;
  isSelected: boolean;
  className?: string;
}

export default function ItemNome (props: Props) {
  return(
    <li
    onClick={(e) => {
      e.stopPropagation();
      props.handleClick();
    }}
    className={classNames({
      [styles.container]: true,
      [styles.selected]: props.isSelected,
      [props.className]: true
    })}>
      <div className={styles.nome}>{props.nome}</div>
      <div className={styles.desc}>{props.desc}</div>
    </li>
  );
}