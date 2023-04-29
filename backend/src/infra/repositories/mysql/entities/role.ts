import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { User } from "./user";

@Entity({ name: "role" })
export class Role {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false, unique: true, length: 100 })
  name: string;

  @OneToMany(() => User, user => user.role)
  users: User[];
}
