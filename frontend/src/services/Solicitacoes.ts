import { EditarSolicitacaoProps, SolicitacaoProps } from "../types";
import api from "./api";

// alterar depois
interface Solicitacao {
    
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

    async atualizar(id: number, solicitacao: EditarSolicitacaoProps) {
        const {data} = await api.put(`update/solicitacao/${id}`, solicitacao);
        return data;
    }

    async deletar(id: number) {
        const {data} = await api.delete(`solicitacao/delete/${id}`);
        return data;
    }

    async getAll() {
        const {data} = await api.get('find/solicitacao')
        return data;
    }

    async getByID(id: number): Promise<SolicitacaoProps> {
        const {data} = await api.get(`solicitacao/${id}`);
        return data;
    }

    async getByCriador(criador: number) {
        console.log(`pegando solicitações do criador ${criador}`)
    }

    async avaliar(id: number, avaliacao: Avaliacao) {
        console.log('avaliando solicitação ', id);
    }

    async liberarParaAvaliacao(id: number) {
        const {data} = await api.put(`update/solicitacao/${id}`, {status: 'Em avaliação'});
        return data;
    }

    async liberarParaProducao(id: number) {
        const {data} = await api.put(`update/solicitacao/${id}`, {status: 'Em produção.New'});
        return data;
    }

    async arquivar(id: number) {
        const {data} = await api.put(`update/solicitacao/${id}`, {status: 'archived'});
        return data;
    }

    async atualizarProducao(id: number, status: string) {
        const {data} = await api.put(`update/solicitacao/${id}`, {status: `Em produção.${status}`});
        return data;
    }
}

export default new Solicitacoes();