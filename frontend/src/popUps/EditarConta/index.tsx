import { useEffect, useState } from "react";
import PopUp from "../../components/PopUp";
import classNames from "classnames";
import { BotaoPopup } from "../../components/Botoes";
import { InputPopup } from "../../components/Inputs";
import styles from './EditarConta.module.scss';

interface Props {
    aberto: boolean;
    onClose: () => void;
}

export default function VizualizarSolicitacao (props: Props) {

    const [titulo, setTitulo] = useState('');
    const [tipo, setTipo] = useState('Feature');
    const [aberto, setAberto] = useState(props.aberto);

    useEffect(() => {
        setAberto(props.aberto);
      }, [props.aberto])

      
    function concluir() {
        throw new Error("Function not implemented.");
    }

    return(
        <PopUp 
            titulo={`Editar Conta`}
            visivel={aberto}
            onClose={() => props.onClose()} >

            <form className={styles.form} onSubmit={(e) => {
                e.preventDefault();
                concluir();
                }}>
                <div className={styles.inputs}>
                    <label
                    className={classNames({
                        [styles.input]: true,
                        [styles.preencher]: true
                    })}
                    >
                        <span className={styles.label}>Título</span>
                        <InputPopup
                        handleChange={(e) => setTitulo(e.target.value)}
                        placeholder="Email"
                        className={styles['input-preencher']}
                        valor={titulo}
                        />

                        <InputPopup
                        handleChange={(e) => setTitulo(e.target.value)}
                        placeholder="Senha"
                        className={styles['input-preencher']}
                        valor={titulo}
                        />

                        
                    </label>
                
                </div>

                <div className={styles['container-concluir']}>
                    <BotaoPopup
                    handleClick={() => console.log('foi botao')}
                    tipo="submit"
                    className={styles.concluir}
                    >Criar</BotaoPopup>
                    
                </div>       
            </form>   
        </PopUp>
        
    )
}