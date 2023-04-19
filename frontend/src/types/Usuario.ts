export default class Usuario {
    constructor(
        private nome: string,
        private token: string,
        private grupo: string
    ) {}

    public getNome() {return this.nome;}
    public getToken() {return this.token;}
    public getGrupo() {return this.grupo;}
    
    public setNome(nome: string) {this.nome = nome}
    public setToken(token: string) {this.token = token}
    public setGrupo(grupo: string) {this.grupo = grupo}
}