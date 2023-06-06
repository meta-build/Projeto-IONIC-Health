import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  CreateDateColumn,
} from "typeorm";
import { User } from "./user";

@Entity({ name: "notification" })
export class Notification {

  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, { onDelete: "CASCADE" })
  @JoinColumn()
  user: User;

  @Column()
  userId: number;

  @Column({ length: 250, unique: false, nullable: true })
  text: string;

  @CreateDateColumn()
  createdAt: Date;
  ticket: number;
  rating: number;

}
