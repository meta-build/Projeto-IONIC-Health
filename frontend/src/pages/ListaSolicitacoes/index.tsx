
import ListaSolicitacoesDesktop from "./ListaSolicitacoesDesktop";
import ListaSolicitacoesMobile from "./ListaSolicitacoesMobile";

export default function ListaSolicitacoes(){
  return(
    <>
      <ListaSolicitacoesMobile />
      <ListaSolicitacoesDesktop />
    </>
  )
}