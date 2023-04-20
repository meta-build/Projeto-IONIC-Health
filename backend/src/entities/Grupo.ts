import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity({ name: "grupo" })
export class Grupo {
  // define a chave primária como auto incremento
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false, unique: false, length: 100 })
  name: string;
}
