import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { DetailTransaction } from "./detail-transaction.entity";

@Entity()
export class Menu {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;
    
    @Column()
    price: number;
    
    @Column({default: 0})
    stock: number;

    @Column()
    category: string;
}
