import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  JoinColumn,
  OneToMany,
  ManyToOne,
} from "typeorm";
import { Role } from "./role";
import { Rating } from './rating';

@Entity({ name: "user" })
export class User {
  // define a chave primária como auto incremento
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false, unique: false, length: 100 })
  name: string;

  @Column({ nullable: false, unique: false, length: 70 })
  email: string;

  @Column({ nullable: false, unique: false, length: 250 })
  password: string;

  @OneToMany(() => Rating, rating => rating.user)
  ratings: Rating[];

  @ManyToOne(() => Role, role => role.name)
  @JoinColumn()
  role: Role;

  @Column()
  roleId: number;
}
