export default class Usuario {
    constructor(
        private id: number,
        private token: string,
        private grupo: number,
        private nome: string
    ) {}

    public getToken() {return this.token;}
    public getGrupo() {return this.grupo;}
    public getNome() {return this.nome;}
    public getId() {return this.id;}
    
    public setToken(token: string) {this.token = token}
    public setGrupo(grupo: number) {this.grupo = grupo}
    public setNome(nome: string) {this.nome = nome}
    public setId(id: number) {this.id = id}
}