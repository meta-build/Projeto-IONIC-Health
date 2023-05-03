class Notificacoes {
  async deletar(id: number) {
    console.log('excluindo notificacao do id ', id);
  }

  async deletarByUsuario(idUsuario: number) {
    console.log(`deletando todas as notificações do usuário ${idUsuario}`);
  }

  async getByUsuario(idUsuario: number) {
    console.log(`pegando todas as notif do usuario ${idUsuario}`);
  }
}

export default new Notificacoes();