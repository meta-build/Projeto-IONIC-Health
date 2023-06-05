import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  JoinColumn,
  OneToMany,
  ManyToOne,
  ManyToMany,
  JoinTable,
} from "typeorm";
import { Role } from "./role";
import { Rating } from './rating';
import { Permission } from "./permission";

@Entity({ name: "user" })
export class User {
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

  @Column({ nullable: true })
  roleId: number;

  @Column({ default: true })
  isActive: boolean;

  @ManyToMany(() => Permission)
  @JoinTable({
    name: 'user_permission',
    joinColumn: {
      name: 'userId',
      referencedColumnName: 'id'
    },
    inverseJoinColumn: {
      name: 'permissionId',
      referencedColumnName: 'id'
    }
  })
  permissions: Permission[]
}
