import DropdownPopup from "../../components/DropdownPopup";


export default function Home () {
    return(
        <div>
            <DropdownPopup itens={['op1',  'op2', 'op3']} handleSelected={(selected: string) => console.log(selected)}></DropdownPopup>
        </div>
    )
}