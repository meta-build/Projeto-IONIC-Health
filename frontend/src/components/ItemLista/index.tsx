import styles from './ItemLista.module.scss';

interface Props {
  itemName: string;
  handleClickName: () => void;
  acao?: JSX.Element;
}

export function ItemLista(props: Props) {
  return (
    <>
      <li className={styles.item} onClick={props.handleClickName}>
        <a className={styles.nome} >{props.itemName}</a>
        {props.acao}
      </li>
    </>
  );
}   