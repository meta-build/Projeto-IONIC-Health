
import styles from "./novaSolicitacao.module.scss";
import Voltar from "../../components/Voltar";
import BotaoPopup from "../../components/BotaoPopup";
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

              <label className="tipo">Tipo</label>


              <label className="descricao">Descrição:</label>
              <input type="text" />

            </form>
            <DropdownPopup itens={["Feature", "Hotflix"]} handleSelected={function (selected: string): void { }} />


            <BotaoPopup children={"Criar"} handleClick={() => console.log('foi')} />
          </div>
        </div>
      </div>
    </>
  );
}








