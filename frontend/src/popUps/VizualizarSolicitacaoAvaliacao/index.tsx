import { ChangeEvent, useEffect, useState } from "react";
import PopUp from "../../components/PopUp";
import classNames from "classnames";
import { BotaoPopup } from "../../components/Botoes";
import { InputPopup } from "../../components/Inputs";
import styles from './VizualizarSolicitacao.module.scss';

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
            titulo={`Feature XXXX`}
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
                        <span className={styles.label}>Descrição</span>

                        <label className={styles.label1}> 
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque vestibulum libero mauris, a posuere lacus elementum quis. Vestibulum in lorem at nibh semper facilisis a ut augue. Praesent sed magna sed dui condimentum elementum. Donec nec tortor tincidunt urna bibendum semper. Duis sed malesuada ipsum. Nunc ullamcorper sodales libero, a varius metus facilisis sit amet. Praesent ac mi sit amet ligula commodo sollicitudin nec sit amet nibh. Aenean ultricies lorem et ex ullamcorper, vel volutpat odio semper. Praesent efficitur, nisi eu tristique lacinia, enim arcu vestibulum felis, at semper erat urna vitae orci. Duis imperdiet ante non ullamcorper laoreet. Integer luctus sed nisl quis fermentum. In ut nisl nec libero tristique maximus. Suspendisse sagittis nisl at velit laoreet suscipit.
                        </label>

                        <span className={styles.label}>Arquivos</span>

                        <span className={styles.label}>Avaliações</span>

                        
                    </label>
                
                </div>  
            </form>   
        </PopUp>
        
    )
}