import { Column, Entity, ManyToMany, ManyToOne, NumericType, PrimaryGeneratedColumn } from "typeorm";
import { HeaderTransaction } from "./header-transaction.entity";

@Entity()
export class DetailTransaction {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    header_id: number;

    @Column()
    menu_id: string;

    @Column()
    price: number;

    @Column()
    qty: number;
    
    @Column()
    subtotal: number;

    @ManyToOne(() => HeaderTransaction, header => header.id)
    header: HeaderTransaction;
}