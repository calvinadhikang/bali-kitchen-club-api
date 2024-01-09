import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { HeaderTransaction } from "./header-transaction.entity";

enum UserRole {
    STAFF = 'Staff',
    OWNER = 'Owner'
}

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

    @Column({
        type: 'enum',
        enum: UserRole,
        default: UserRole.STAFF
    })
    role: string;

    @OneToMany(() => HeaderTransaction, header => header.employee)
    transactions: HeaderTransaction[];
}