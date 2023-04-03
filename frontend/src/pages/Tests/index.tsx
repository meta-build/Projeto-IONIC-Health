import BotaoNota from "../../components/BotaoNota";
import { useState } from "react";
import GoogleIcon from "../../components/GoogleIcon";
import IconeClicavel from "../../components/IconeClicavel";
import ItemLista from "../../components/ItemLista";
import styles from './Tests.module.scss';
import AcaoNotas from "../../components/ItemLista/ItemAcoes/AcaoNotas";
import AcaoEditarExcluir from "../../components/ItemLista/ItemAcoes/AcaoEditarExcluir";
import AcaoProducao from "../../components/ItemLista/ItemAcoes/AcaoProducao";

export default function Tests () {
    const [selecionado, setSelecionado] = useState<number>();

    return (
        <>
            <ul className={styles.lista}>
                <ItemLista
                itemName="teste"
                handleClickName={() => console.log('click name')}
                acao={<AcaoEditarExcluir
                    onDelete={() => console.log('foidelete')}
                    onEdit={() => console.log('foiedit')} />}
                />
                <ItemLista
                itemName="teste"
                handleClickName={() => console.log('click name')}
                acao={<AcaoProducao status="New" />}
                />
                <ItemLista
                itemName="teste"
                handleClickName={() => console.log('click name')}
                acao={<AcaoProducao status="On Holding" />}
                />
                <ItemLista
                itemName="teste"
                handleClickName={() => console.log('click name')}
                acao={<AcaoProducao status="Done" />}
                />
                <ItemLista
                itemName="teste"
                handleClickName={() => console.log('click name')}
                acao={<AcaoNotas notaRisco={1} notaImpacto={2} notaCusto={2} />}
                />
                <ItemLista
                itemName="teste"
                handleClickName={() => console.log('click name')}
                />
            </ul>
        </>
    );
}