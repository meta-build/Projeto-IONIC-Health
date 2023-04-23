export default class Usuario {
    constructor(
        private id: number,
        private token: string,
        private grupo: number
    ) {}

    public getToken() {return this.token;}
    public getGrupo() {return this.grupo;}
    public getId() {return this.id;}
    
    public setToken(token: string) {this.token = token}
    public setGrupo(grupo: number) {this.grupo = grupo}
    public setId(id: number) {this.id = id}
}