import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Solicitacao } from './Solicitacao';

@Entity({ name: 'attachment' })
export class Attachment {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    fileName: string;

    @Column()
    fileType: string;

    @Column()
    url: string;

    @Column()
    storageType: 'local' | 's3';

    @Column()
    ticketId: number;

    @ManyToOne(() => Solicitacao, ticket => ticket.attachments, { onDelete: 'CASCADE'})
    ticket: Solicitacao;
}
