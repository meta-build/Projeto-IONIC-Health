import { CreateGrupoProps } from "../types";
import api from "./api";

class Grupos {
  async criar (grupo: CreateGrupoProps) {
    const {data} = await api.post('/role', grupo);
    return data;
  }
  
  async editar (id: number, grupo: CreateGrupoProps) {
    const {data} = await api.put(`/role/${id}`, grupo);
    return data;  
  }

  async deletar (id: number) {
    const {data} = await api.delete(`/role/${id}`);
    return data;  
  }
  
  async getByID (id: number) {
    const {data} = await api.get(`/role/${id}`);
    return data;  
  }

  async getAll () {
    const {data} = await api.get(`/role`);
    return data;  
  }
}

export default new Grupos();