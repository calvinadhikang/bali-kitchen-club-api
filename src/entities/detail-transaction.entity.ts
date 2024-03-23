import { Column, Entity, JoinColumn, ManyToMany, ManyToOne, NumericType, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { HeaderTransaction } from "./header-transaction.entity";
import { Menu } from "./menu.entity";

@Entity()
export class DetailTransaction {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => HeaderTransaction, header => header.id)
    header: HeaderTransaction;

    @Column()
    menu: number;

    @Column()
    price: number;

    @Column()
    qty: number;
    
    @Column()
    subtotal: number;

    @Column()
    name: String;
}