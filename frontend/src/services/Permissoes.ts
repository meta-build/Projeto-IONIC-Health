import { PermissionProps } from "../types";
import api from "./api";

class Permissoes {
  async getAll (): Promise<PermissionProps[]> {
    const {data} = await api.get('/permission');
    return data;
  }
}

export default new Permissoes();