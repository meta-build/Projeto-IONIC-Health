import { Entity, PrimaryGeneratedColumn, Column, BeforeInsert, BeforeUpdate } from "typeorm";

@Entity({name:"solicitacao"})
export class Solicitacao {
    // define a chave primária como auto incremento
    @PrimaryGeneratedColumn()
    id: number;

    @Column({nullable:false, unique:false, length: 100})
    nomeSolicitacao: string;

    @Column({nullable: false, unique:false, length: 70})
    tipoSolicitacao: string;

    @Column({nullable: true, unique:false, length: 70})
    solicitante: string;

    @Column({nullable: true, unique:false, default:null})
    verificaSolicitacao: boolean;

    @Column({nullable: true, unique:false, default:null})
    arquivar: boolean;
    
}
