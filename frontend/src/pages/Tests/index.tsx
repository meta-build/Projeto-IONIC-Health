import BotaoNota from "../../components/BotaoNota";
import { useState } from "react";

export default function Tests () {
    const [selecionado, setSelecionado] = useState<number>();

    return (
        <>
            <BotaoNota
            cor="amarelo"
            handleClick={() => setSelecionado(0)}
            valor={1}
            selecionado={selecionado == 0}
            />
            <BotaoNota
            cor="azul1"
            handleClick={() => setSelecionado(1)}
            valor={2}
            selecionado={selecionado == 1}
            />
            <BotaoNota
            cor="azul2"
            handleClick={() => setSelecionado(2)}
            valor={3}
            selecionado={selecionado == 2}
            />
        </>
    )
}