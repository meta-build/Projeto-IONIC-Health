import api from "./api";

interface Usuario {
    name: string;
    job: string;
}

interface Login {
    email: string;
    senha: string;
}

class Usuarios {
    async criar(usuario: Usuario) {
        console.log('criando usuário');
    }

    async atualizar(id: number, usuarioAtualizado: Usuario) {
        console.log(`atualizando usuário do id ${id}`);
    }

    async deletar(id: number) {
        console.log('excluindo solicitação do id ', id);
    }
    
    async getByID(id: number) {
        console.log(`lendo usuário do id ${id}`);
    }

    async get() {
        console.log('pegando todos os usuários');
    }

    async login(login: Login) {
        console.log(`login: email ${login.email} senha ${login.senha}`);
    }
}

export default new Usuarios();