import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, JoinTable } from 'typeorm'
import { Role } from './role'

@Entity({ name: 'permission' })
export class Permission {
  @PrimaryGeneratedColumn()
  id: number

  @Column({ nullable: false })
  permissionName: string

  @Column({ nullable: false })
  humanizedPermissionName: string

  @Column({ nullable: false })
  entity: string

  @Column({ nullable: false })
  humanizedEntity: string

  @ManyToMany(() => Role)
  @JoinTable({
    name: 'role_permission',
    joinColumn: {
      name: 'permissionId',
      referencedColumnName: 'id'
    },
    inverseJoinColumn: {
      name: 'roleId',
      referencedColumnName: 'id'
    }
  })
  roles: Role[]
}
