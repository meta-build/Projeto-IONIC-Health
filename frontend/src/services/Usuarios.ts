import { EditarUsuarioProps, UsuarioProps } from "../types";
import api from "./api";

interface Usuario {
  name: string;
  mail: string;
  password: string;
  grupoId: number;
}

interface Login {
  mail: string;
  password: string;
}

class Usuarios {
  async criar(usuario: Usuario) {
    const { data } = await api.post('/create/usuario', usuario);
    return data;
  }

  async editar(id: number, usuarioAtualizado: EditarUsuarioProps) {
    const { data } = await api.put(`update/usuario/${id}`, usuarioAtualizado);
    return data;
  }

  async deletar(id: number) {
    const { data } = await api.delete(`delete/usuario/${id}`)
    return data;
  }

  async getByID(id: number): Promise<UsuarioProps> {
    const { data } = await api.get(`find/usuario/${id}`)
    return data;
  }

  async getAll(): Promise<UsuarioProps[]> {
    const { data } = await api.get('find/usuario')
    return data;
  }

  async login(login: Login) {
    const { data } = await api.post('login', login)
    return data;
  }
}

export default new Usuarios();