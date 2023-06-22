import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from "typeorm";

@Entity()
export class Dataset {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    title: string;

    @Column()
    file: string;

    @CreateDateColumn()
    create_date: Date;

    @CreateDateColumn({ update: true })
    update_date: Date;
}