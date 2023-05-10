import PopupAlerta from "../../popUps/PopupAlerta";

export default function Tests () {
    return (
        <PopupAlerta visivel={true} onClose={function (): void {
            throw new Error("Function not implemented.");
        } } onConfirm={function (): void {
            throw new Error("Function not implemented.");
        } } titulo={"Alerta"} descricao={"Excluir solicitação?"} />
    );
}