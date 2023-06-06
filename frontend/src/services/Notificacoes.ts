import api from "./api";
import { NotificationProps } from "../types";

class Notificacoes {
  async deletar(id: number) {
    const {data} = await api.delete(`/notification/${id}`);
    return data;
  }

  async getByUsuario(idUsuario: number): Promise<NotificationProps[]> {
    const {data} = await api.get(`/notification/${idUsuario}`);
    return data;
  }
}

export default new Notificacoes();