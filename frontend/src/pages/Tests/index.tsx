import PopupAlerta from "../../popUps/PopupAlerta";
import PopupAprovacao from "../../popUps/PopupAprovacao";
import PopupUsuarioConfirm from "../../popUps/PopupConfirm";

export default function Tests () {
    return (
      <PopupAprovacao visivel={true} onClose={function (): void {
            throw new Error("Function not implemented.");
        } } onConfirm={function (): void {
            throw new Error("Function not implemented.");
        } } titulo={"Aprovar solicitação para produção?"} descricao={"Após a aprovação, o status da solicitação irá mudar automaticamente"}      />

       
    );
}