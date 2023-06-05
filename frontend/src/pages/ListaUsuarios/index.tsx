import ListaUsuariosDesktop from "./ListaUsuariosDesktop";
import ListaUsuariosMobile from "./ListaUsuariosMobile/ViewUsuarios";

export default function ListaUsuarios(){
    return (

        <>
        <ListaUsuariosMobile />
        <ListaUsuariosDesktop />
    </>

)
}