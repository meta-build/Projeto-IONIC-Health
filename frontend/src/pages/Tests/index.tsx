import BotaoNota from "../../components/BotaoNota";
import { useState } from "react";
import GoogleIcon from "../../components/GoogleIcon";
import IconeClicavel from "../../components/IconeClicavel";

export default function Tests () {
    const [selecionado, setSelecionado] = useState<number>();

    return (
        <>
            <IconeClicavel
            icone={<GoogleIcon>&#xf10b;</GoogleIcon>}
            handleClick={() => console.log('foi')}
            />
        </>
    );
}