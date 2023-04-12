import BotaoNota from "../../../BotaoNota";
import styles from './AcaoNotas.module.scss';

interface Props {
    notaRisco?: number;
    notaImpacto?: number;
    notaCusto?: number;
    notaPreenchida?: boolean
}

export default function AcaoNotas (props: Props) {

    const {notaPreenchida = false} = props;

    const corRiscoCusto:
    ("cinza" | "verde" | "amarelo" | "vermelho" | "azul1" | "azul2")[] =
    [ 'cinza', 'verde', 'amarelo', 'vermelho' ]

    const corImpacto:
    ("cinza" | "verde" | "amarelo" | "vermelho" | "azul1" | "azul2")[] =
    [ 'cinza', 'verde', 'azul1', 'azul2' ]

    return (
        <span className={styles.container}>
            {props.notaRisco !== undefined && <span className={styles.nota}>
                Risco:
                <BotaoNota
                valor={props.notaRisco}
                cor={corRiscoCusto[props.notaRisco]}
                selecionado={notaPreenchida}
                className={styles.numero}
                />
            </span>}
            {props.notaImpacto !== undefined && <span className={styles.nota}>
                Impacto:
                <BotaoNota
                valor={props.notaImpacto}
                cor={corImpacto[props.notaImpacto]}
                selecionado={notaPreenchida}
                className={styles.numero}
                />
            </span>}
            {props.notaCusto !== undefined && <span className={styles.nota}>
                Custo:
                <BotaoNota
                valor={props.notaCusto}
                cor={corRiscoCusto[props.notaCusto]}
                selecionado={notaPreenchida}
                className={styles.numero}
                />
            </span>}
        </span>
    );
}