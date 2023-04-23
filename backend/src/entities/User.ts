import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  JoinColumn,
  ManyToOne,
  OneToMany,
} from "typeorm";
import { Grupo } from "./Grupo";
import { Solicitacao } from "./Solicitacao";

@Entity({ name: "usuario" })
export class User {
  // define a chave primária como auto incremento
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false, unique: false, length: 100 })
  name: string;

  @Column({ nullable: false, unique: false, length: 70 })
  mail: string;

  @Column({ nullable: false, unique: false, length: 250 })
  password: string;

  @ManyToOne(() => Grupo, id_grupo => id_grupo.name)
  @JoinColumn()
  grupo: Grupo;

  @Column()
  grupoId: number;
}
