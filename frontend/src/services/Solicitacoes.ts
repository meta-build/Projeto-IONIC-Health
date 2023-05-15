import axios from "axios";
import { EditarSolicitacaoProps, SolicitacaoProps } from "../types";
import api from "./api";

// alterar depois
interface SolicitacaoCreate {
  title: string;
  type: string;
  description: string;
  attachments: File[];
}

interface Avaliacao {
  value: number,
  committee: string,
  comment: string,
  ticketId: number;
}

class Solicitacoes {
  async criar(solicitacao: SolicitacaoCreate, token: string) {
    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
        "Authorization": `Bearer ${token}`
      }
    };

    const url = 'http://localhost:3001/api/ticket';
    const formData = new FormData();
    formData.append('title', solicitacao.title);
    formData.append('type', solicitacao.type);
    formData.append('description', solicitacao.description);
    solicitacao.attachments.forEach(file => {
      formData.append('attachments', file);
    });
    const { data } = await axios.post(url, formData, config);
    return data;
  }

  async atualizar(id: number, solicitacao: EditarSolicitacaoProps) {
    const { data } = await api.put(`ticket/${id}`, solicitacao);
    return data;
  }

  async deletar(id: number) {
    const { data } = await api.delete(`ticket/${id}`);
    return data;
  }

  async getAll(): Promise<SolicitacaoProps> {
    const { data } = await api.get('ticket')
    return data;
  }

  async getByID(id: number): Promise<SolicitacaoProps> {
    const { data } = await api.get(`ticket/${id}`);
    return data;
  }

  async avaliar(avaliacao: Avaliacao) {
    const { data } = await api.post('rating', avaliacao)
    return data;
  }

  async liberarParaAvaliacao(id: number, solicitacao: EditarSolicitacaoProps) {
    const { data } = await api.put(`ticket/${id}`, { ...solicitacao, status: 'RATING' });
    return data;
  }

  async liberarParaProducao(id: number, solicitacao: EditarSolicitacaoProps) {
    const { data } = await api.put(`ticket/${id}`, { ...solicitacao, status: 'NEW' });
    return data;
  }

  async arquivar(id: number, solicitacao: EditarSolicitacaoProps) {
    const { data } = await api.put(`ticket/${id}`, { ...solicitacao, isArchived: true });
    return data;
  }

  async desarquivar(id: number, solicitacao: EditarSolicitacaoProps) {
    const { data } = await api.put(`ticket/${id}`, { ...solicitacao, isArchived: false });
    return data;
  }

  async atualizarProducao(id: number, status: 'NEW' | 'ONHOLDING' | 'DONE', solicitacao: EditarSolicitacaoProps) {
    const { data } = await api.put(`ticket/${id}`, { ...solicitacao, status: status });
    return data;
  }
}

export default new Solicitacoes();