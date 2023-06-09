import { CreateGrupoProps, GrupoProps } from "../types";
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
  
  async getByID (id: number):Promise<GrupoProps> {
    const {data} = await api.get(`/role/${id}`);
    console.log(data);
    return data;  
  }
  
  async getAll (): Promise<GrupoProps[]> {
    const {data} = await api.get(`/role`);
    console.log(data);
    return data;  
  }
}

export default new Grupos();