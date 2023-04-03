
import styles from "./novaSolicitacao.module.scss";
import Voltar from "../../components/Voltar";
import BotaoPopup from "../../components/BotaoPopUp";
import DropdownPopup from "../../components/DropdownPopup";

export default function NovaSolicitacao() {
    return (
        
      <div className={styles.container}>
       <Voltar /> 
        
        <div className={styles.containerCinza}>
            <div className={styles.solicitacao}>
            <h1>Nova Solicitação

            <form>
                <label className="titulo">Título</label>
                <input type="text" id="titulo" />

                <label className="tipo">Tipo</label>
                
              
                <label className="descricao">Descrição:</label>
                <input type="text" />
          
            </form>
            <DropdownPopup itens={["Feature" , "Hotflix"]} handleSelected={function (selected: string): void {} }/>
            

            <BotaoPopup children={"Criar"} handleClick={function (): void {
                    throw new Error("Function not implemented.");
                    } } />   
                

                
            </h1>
            </div>
        </div>
      </div>
    );
  }


  



  

