import { ReactNode, useRef } from "react"
import styles from './Anexar.module.scss';
import classNames from "classnames";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAdd } from "@fortawesome/free-solid-svg-icons";

interface Props {
    children: ReactNode;
    handleClick: () => void;
    corBotao?: 'claro' | 'noturno'

}

export default function Anexar (props: Props) {
    const {corBotao = 'claro'} = props;
    const inputRef = useRef<HTMLInputElement>(null);

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files && event.target.files[0];
        console.log('Arquivo selecionado:', file);
    }


    return(
        <div>
            <button
                onClick={()=> inputRef.current?.click()}
                className={classNames({
                [styles.botao]: true,
                [styles[corBotao]]: true 
            })}
            >
            <FontAwesomeIcon icon={faAdd} className={styles.icon} />
            <span className={styles.children}>
                {props.children}
            </span>
            
        </button>

        <input
            ref={inputRef}
            type="file"
            style={{ display: 'none' }}
            onChange={handleFileChange}
        />
        </div>    
    );
}