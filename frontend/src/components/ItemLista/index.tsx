import AcaoEditarExcluir from './ItemAcoes/AcaoEditarExcluir';
import AcaoNotas from './ItemAcoes/AcaoNotas';
import AcaoProducao from './ItemAcoes/AcaoProducao';
import styles from './ItemLista.module.scss';

interface Props {
    itemName: string;
    handleClickName: () => void;
    acao?: JSX.Element;
}

export default function ItemLista (props: Props) {
    return(
        <>
            <li className={styles.item}>
                <a className={styles.nome} onClick={props.handleClickName}>nome solicitação</a>
                {props.acao}
            </li>
        </>
    );
}   