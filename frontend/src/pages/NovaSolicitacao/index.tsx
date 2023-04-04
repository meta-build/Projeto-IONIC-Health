
import styles from "./novaSolicitacao.module.scss";
import Voltar from "../../components/Voltar";
import BotaoPopup from "../../components/BotaoPopUp";
import DropdownPopup from "../../components/DropdownPopup";
import classNames from "classnames";
import { useState } from "react";

export default function NovaSolicitacao() {
  const [fechado, setFechado] = useState(true);

  return (
    <>
      <button onClick={() => setFechado(false)}>abrir</button>
      <div className={classNames({
        [styles.container]: true,
        [styles.fechar]: fechado
      })}>
        <Voltar />
        <div className={styles.containerCinza}>
          <button onClick={() => setFechado(true)}>fechar</button>
          <div className={styles.solicitacao}>
            <h1>Nova Solicitação</h1>

            <form>
              <label className="titulo">Título</label>
              <input type="text" id="titulo" />




              <label className="descricao">Descrição:</label>
              
              

            </form>
            <input className={styles.descricaoInput} type="text" />
            <DropdownPopup itens={["Feature", "Hotflix"]} handleSelected={function (selected: string): void { }} />
            

            <BotaoPopup children={"Criar"} handleClick={() => console.log('foi')} />
          </div>
        </div>
      </div>
    </>
  );
}








