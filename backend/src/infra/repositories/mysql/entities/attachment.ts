import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Ticket } from './ticket';

@Entity({ name: 'attachment' })
export class Attachment {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    fileName: string;

    @Column()
    mimeType: string;

    @Column()
    url: string;

    @Column()
    storageType: 'local' | 's3';

    @Column()
    ticketId: number;

    @ManyToOne(() => Ticket, ticket => ticket.attachments, { onDelete: 'CASCADE'})
    ticket: Ticket;
}
