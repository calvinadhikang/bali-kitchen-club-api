import { Column, Entity, ManyToMany, ManyToOne, NumericType, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { HeaderTransaction } from "./header-transaction.entity";
import { Menu } from "./menu.entity";

@Entity()
export class DetailTransaction {
    @PrimaryGeneratedColumn()
    id: number;

    @OneToOne(() => HeaderTransaction, header => header.id)
    header: HeaderTransaction;

    @OneToOne(() => Menu, menu => menu.id)
    menu: Menu;

    @Column()
    price: number;

    @Column()
    qty: number;
    
    @Column()
    subtotal: number;
}