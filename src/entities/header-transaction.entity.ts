import { Column, CreateDateColumn, Entity, JoinColumn, NumericType, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { DetailTransaction } from "./detail-transaction.entity";
import { User } from "./user.entity";
import { Sesi } from "./sesi.entity";

@Entity()
export class HeaderTransaction {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    customer: string;

    @Column()
    employee: number;

    @Column()
    tax: number;
    
    @Column()
    tax_value: number;
    
    @Column()
    total: number;
    
    @Column()
    grand_total: number;
    
    @Column()
    sesi: number;

    @CreateDateColumn({default: () => 'CURRENT_TIMESTAMP'})
    createdAt: Date;

    @OneToMany(() => DetailTransaction, detail => detail.header, {cascade: true})
    details: DetailTransaction[]
}