import { faGrinHearts } from "@fortawesome/free-regular-svg-icons";
import BotaoIcon from "../../components/BotaoIcon";


export default function Home () {
    return(
        <div>
            <BotaoIcon handleClick={() => console.log('foi')} icon={faGrinHearts}>Teste 123123123123</BotaoIcon>
        </div>
    );
}