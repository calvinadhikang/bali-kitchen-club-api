import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { HeaderTransaction } from "./header-transaction.entity";

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    username: string;

    @Column()
    password: string;

    @OneToMany(() => HeaderTransaction, header => header.employee)
    transactions: HeaderTransaction[];
}