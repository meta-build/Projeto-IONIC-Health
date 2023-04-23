import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Solicitacao } from './Solicitacao';
import { User } from "./User";


@Entity({ name: 'rating' })
export class Rating {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    value: number;

    @Column()
    committee: string;

    @Column()
    comment: string;

    @Column()
    userId: number

    @ManyToOne(() => User, user => user.ratings)
    user: User

    @Column()
    ticketId: number;

    @ManyToOne(() => Solicitacao, ticket => ticket.attachments)
    ticket: Solicitacao;
}
