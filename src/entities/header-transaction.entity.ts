import { Column, CreateDateColumn, Entity, NumericType, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { DetailTransaction } from "./detail-transaction.entity";
import { User } from "./user.entity";

@Entity()
export class HeaderTransaction {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    customer: string;

    @OneToOne(() => User, user => user.id)
    employee: User;

    @Column()
    tax: number;
    
    @Column()
    total: number;
    
    @Column()
    tax_value: number;

    @Column()
    grand_total: number;

    @CreateDateColumn({default: () => 'CURRENT_TIMESTAMP'})
    createdAt: Date;

    @OneToMany(() => DetailTransaction, detail => detail.header_id)
    details: DetailTransaction[]
}