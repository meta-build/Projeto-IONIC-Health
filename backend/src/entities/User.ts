import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
  JoinColumn,
  OneToMany,
} from "typeorm";
import { Grupo } from "./Grupo";
import { Rating } from './Rating';

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

  @OneToOne((type) => Grupo, { onDelete: "CASCADE" })
  @JoinColumn({
    name: "id_grupo",
    referencedColumnName: "id", //id da entidade Grupo
    foreignKeyConstraintName: "fk_id_grupo_usuario",
  })
  id_grupo: Grupo;

  @OneToMany(() => Rating, rating => rating.user)
  ratings: Rating[];
}
