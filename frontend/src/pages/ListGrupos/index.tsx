import ListGruposDesktop from "./ListGruposDesktop";
import ListGruposMobile from "./ListGruposMobile/ViewGrupos";

export default function ListGrupos(){
  return(
    <>
      <ListGruposDesktop />
      <ListGruposMobile />
    </>
  )
}