import { useParams } from "react-router";
import NovoUsuarioMobile from "./NovoUsuarioMobile";
import NovoUsuarioDesktop from "./NovoUsuarioDesktop";

export default function NovoUsuario () {
  return(
    <>
      <NovoUsuarioDesktop />
      <NovoUsuarioMobile />
    </>
  );
}