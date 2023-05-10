import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  ManyToMany,
  JoinTable
} from 'typeorm'
import { User } from './user'
import { Permission } from './permission'

@Entity({ name: 'role' })
export class Role {
  @PrimaryGeneratedColumn()
  id: number

  @Column({ nullable: false, unique: true, length: 100 })
  name: string

  @Column({ nullable: false, default: false })
  isAdmin: boolean

  @OneToMany(() => User, (user) => user.role)
  users: User[]

  @ManyToMany(() => Permission)
  @JoinTable()
  permissions: Permission[]
}
