import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAddressBook } from '@fortawesome/free-regular-svg-icons'
import InputContornado from "../../components/InputContornado";

export default function Tests () {
    return (
        <>
            <InputContornado
            icon={<FontAwesomeIcon icon={faAddressBook} />}
            placeholder="teste"
            handleChange={(e) => console.log(e)} />
        </>
    )
}