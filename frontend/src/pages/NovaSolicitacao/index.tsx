
import styles from "./novaSolicitacao.module.scss";
import Voltar from "../../components/Voltar";
import BotaoPopup from "../../components/BotaoPopUp";
import DropdownPopup from "../../components/DropdownPopup";
import classNames from "classnames";
import { useState } from "react";
import PopUp from "../../components/PopUp";
import { useNavigate } from "react-router-dom";
/*<textarea className={styles.inputDescricao}/>*/

export default function novaSolicitacao () {
  // const [selecionado, setSelecionado] = useState<number>();
  const [popup, setPopup] = useState(false);
  const navigate = useNavigate();

  return (
      <>
      <div className={styles.solicitacao}>
          <button onClick={() => setPopup(true)}>abrir</button>
          <PopUp
          titulo="Nova Solicitação"
          visivel={popup}
          onClose={() => setPopup(false)}
          >
            <form>

              <label className="titulo">Título:</label>
              <input type="text" className={styles.input} />    
    
            </form>
            <DropdownPopup itens={["Feature", "Hotflix"]} handleSelected={function (selected: string): void { }} />
                     

 
        <div className={styles.voltar} onClick={() => navigate(-1)}>
          <BotaoPopup children={"Criar"} handleClick={() => console.log('foi')} />
        </div>

          </PopUp>

          </div>
      </>
  );
}







