import styles from './DropdownContornado.module.scss';
import classNames from "classnames";
import { ReactNode, useState } from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown, faChevronUp } from "@fortawesome/free-solid-svg-icons";
// import DropdownItem from '../../types/DropdownItem';

interface Props {
    itens: string[];
    children?: ReactNode;
    handleSelected: (selected: string) => void;
    selecionadoFst?: string;
}

export default function DropdownPreenchido (props: Props) {
    const [aberto, setAberto] = useState(false);
    const [selecionado, setSelecionado] = useState(props.selecionadoFst || props.itens[0]);

    // itens feature/hotfix
    // itens={[
    //     new DropdownItem('Feature', <GoogleIcon>&#xE8B8;</GoogleIcon>),
    //     new DropdownItem('Hotfix', <GoogleIcon>&#xf10b;</GoogleIcon>)
    // ]}

    return(
        <div className={styles.container}>
            <button
            onClick={() => setAberto(!aberto)}
            type='button'
            className={classNames({
                [styles.botao]: true
            })}>
                <span className={styles.children}>
                    {selecionado}
                </span>
                {aberto ?
                <FontAwesomeIcon icon={faChevronUp} className={styles.arrow} /> :
                <FontAwesomeIcon icon={faChevronDown} className={styles.arrow} />}
            </button>

            {aberto && 
            <ul className={styles.list} >
            {props.itens.map((item, index) => (
                <li key={index}><button onClick={() => {setSelecionado(item); setAberto(false); props.handleSelected(item)}} >
                    {item}
                </button></li>
            ))}
            </ul>}
        </div>
    );
}