import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import BotaoIcon from "../../../Botoes/BotaoIcon";
import { fa0, fa2, faPen, faTrash } from "@fortawesome/free-solid-svg-icons";
import IconeClicavel from "../../../Botoes/IconeClicavel";
import styles from './AcaoEdtiar.module.scss';

interface Props {
    onDelete: () => void;
    onEdit: () => void;
}

export default function AcaoEditarExcluir (props: Props) {
    return(
        <span>
            {/* <IconeClicavel
            icone={<FontAwesomeIcon icon={faTrash} />}
            handleClick={props.onDelete}
            className={styles.icone}
            /> */}
            <IconeClicavel
            icone={<FontAwesomeIcon icon={faPen} />}
            handleClick={props.onEdit}
            />
        </span>
    )
}