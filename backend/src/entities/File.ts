import { Column, PrimaryGeneratedColumn } from "typeorm";


export class File {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    data: Buffer;
    
    @Column()
    name: string;

}