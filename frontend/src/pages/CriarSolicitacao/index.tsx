import CriarSolicitacaoDesktop from "./CriarSolicitacaoDesktop";
import CriarSolicitacaoMobile from "./CriarSolicitacaoMobile";

export default function CriarSolicitacao () {
  return(
    <>
      <CriarSolicitacaoDesktop />
      <CriarSolicitacaoMobile />
    </>
  );
}