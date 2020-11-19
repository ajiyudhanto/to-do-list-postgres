import {Entity, Column, PrimaryGeneratedColumn} from "typeorm";

@Entity()
export class ToDo {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    title: string;

    @Column()
    description: string;

    @Column()
    status: boolean;

    @Column()
    date: string;

}