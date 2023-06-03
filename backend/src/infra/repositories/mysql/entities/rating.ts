import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Ticket } from './ticket';
import { User } from "./user";


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

    @ManyToOne(() => User, user => user.ratings, { onDelete: 'CASCADE'})
    user: User

    @Column()
    ticketId: number;

    @ManyToOne(() => Ticket, ticket => ticket.attachments, { onDelete: 'CASCADE'})
    ticket: Ticket;

    @CreateDateColumn()
    createdAt: Date
}
