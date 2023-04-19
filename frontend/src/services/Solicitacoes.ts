import api from "./api";

// alterar depois
interface Solicitacao {
    name: string;
    job: string;
}

interface Avaliacao {
    comite: string;
    nota: number;
    comentario: string;
}

class Solicitacoes {
    async criar(solicitacao: Solicitacao) {
        console.log(`criando solicitação`)
    }

    async atualizar(id: number, solicitacaoAtualizada: Solicitacao) {
        console.log(`editando solicitação ${id}`);
    }

    async deletar(id: number) {
        console.log('excluindo solicitação do id ', id);
    }

    async getBySituacao(situacao: string) {
        console.log(`lendo solicitações de situação ${situacao}`);
    }

    async getByID(id: number) {
        console.log(`pegando solicitação do id ${id}`);
    }

    async getByCriador(criador: number) {
        console.log(`pegando solicitações do criador ${criador}`)
    }

    async avaliar(id: number, avaliacao: Avaliacao) {
        console.log('avaliando solicitação ', id);
    }

    async liberarParaAvaliacao(id: number) {
        console.log('liberando para avaliacao a solicitação ', id);
    }

    async liberarParaProducao(id: number) {
        console.log('liberando para produção a solicitação ', id);
    }

    async arquivar(id: number) {
        console.log('arquivar ', id);
    }

    async atualizarProducao(id: number, status: string) {
        const statusJSON = {status}
        console.log(`atualizando produção da solicitação ${id} para ${statusJSON.status}`)
    }
}

export default new Solicitacoes();