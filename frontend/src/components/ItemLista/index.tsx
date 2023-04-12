import styles from './ItemLista.module.scss';

interface Props {
    itemName: string;
    handleClickName: () => void;
    acao?: JSX.Element;
}

export function ItemLista (props: Props) {
    return(
        <>
            <li className={styles.item}>
                <a className={styles.nome} onClick={props.handleClickName}>{props.itemName}</a>
                {props.acao}
            </li>
        </>
    );
}   