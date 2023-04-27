import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  CreateDateColumn,
} from "typeorm";
import { User } from "./User";

@Entity({ name: "notificacao" })
export class Notificacao {
  // define a chave primária como auto incremento
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne((type) => User, { onDelete: "CASCADE" })
  @JoinColumn({
    name: "id_user",
    referencedColumnName: "id", //id da entidade Usuario
    foreignKeyConstraintName: "fk_id_user",
  })
  user: User;

  @Column({ length: 250, unique: false, nullable: true })
  texto: string;

  @CreateDateColumn()
  data_hora: Date;
}
