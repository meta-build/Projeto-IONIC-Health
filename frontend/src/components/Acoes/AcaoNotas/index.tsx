import {BotaoNota} from "../../../Botoes";
import styles from './AcaoNotas.module.scss';

interface NotaProps {
    nota: number,
    comite: string
}
interface Props {
    notas: NotaProps[];
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
            {/* {props.notaRisco !== undefined && <span className={styles.nota}>
                Risco:
                <BotaoNota
                valor={props.notaRisco}
                cor={corRiscoCusto[props.notaRisco]}
                selecionado={notaPreenchida}
                className={styles.numero}
                />
            </span>} */}
            {props.notas.map(nota => (
                <span className={styles.nota}>
                {nota.comite}:
                <BotaoNota
                valor={nota.nota}
                cor={corRiscoCusto[nota.nota]}
                selecionado={notaPreenchida}
                className={styles.numero}
                />
            </span>
            ))}
        </span>
    );
}