import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  JoinColumn,
  ManyToOne,
  OneToMany
} from 'typeorm'
import { User } from './user'
import { Attachment } from './attachment'
import { Rating } from './rating'
import { Role } from './role'

@Entity({ name: 'ticket' })
export class Ticket {
  @PrimaryGeneratedColumn()
  id: number

  @Column({ nullable: false, unique: false, length: 100 })
  title: string

  @Column({ nullable: false, unique: false, length: 100 })
  type: string

  @Column({ nullable: true, unique: false, length: 150 })
  description: string

  @Column({ default: 'NEW' })
  status: string

  @ManyToOne(() => User, { onDelete: 'CASCADE' })
  @JoinColumn()
  requester: User

  @Column()
  requesterId: number

  @OneToMany(() => Attachment, (attachment) => attachment.ticket, {
    onDelete: 'CASCADE'
  })
  attachments: Attachment[]

  @JoinColumn()
  @OneToMany(() => Rating, (rating) => rating.ticket, { onDelete: 'CASCADE' })
  ratings: Rating[]

  @CreateDateColumn()
  createdAt: Date

  @Column({ nullable: true })
  updatedAt: Date

  @Column({ nullable: true })
  archivedAt: Date

  @Column({ nullable: true })
  isArchived: boolean

  @ManyToOne(() => Role, (role) => role.tickets)
  assignedRole: Role

  @Column()
  assignedRoleId: number
}
