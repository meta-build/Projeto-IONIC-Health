import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAddressBook, faAngry } from '@fortawesome/free-regular-svg-icons'
import DropdownContornado from "../../components/DropdownContornado";
import GoogleIcon from "../../components/GoogleIcon";
import DropdownItem from "../../types/DropdownItem";

export default function Tests () {
    return (
        <>
            <DropdownContornado
            itens={[
                new DropdownItem('Feature', <GoogleIcon>&#xE8B8;</GoogleIcon>),
                new DropdownItem('Hotfix', <GoogleIcon>&#xf10b;</GoogleIcon>)
            ]}
            handleSelected={(s: string) => console.log(s)}
            icon={<GoogleIcon>&#xe89c;</GoogleIcon>}
            />
        </>
    )
}