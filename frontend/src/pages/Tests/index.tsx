
import PopupErro from "../../popUps/PopupErro";

export default function Tests () {
    return (
    <PopupErro visivel={true} onClose={function (): void {
            throw new Error("Function not implemented.");
        } } onConfirm={function (): void {
            throw new Error("Function not implemented.");
        } } titulo={"Erro ao efetuar tarefa"} descricao={"Tente novamente mais tarde"}
    />

       
    );
}