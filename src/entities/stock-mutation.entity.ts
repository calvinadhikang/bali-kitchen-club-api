import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

export enum MutationStatus {
    MASUK = 'Masuk',
    KELUAR = 'Keluar'
}

export enum MutationType {
    INPUT = 'Input',
    TRANSAKSI = 'Transaksi',
    RUSAK = 'Rusak'
}

@Entity()
export class StockMutation {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    menu: number;

    @Column()
    qty: number;

    @Column()
    reference: number;

    @Column({
        type: 'enum',
        enum: MutationStatus,
        default: MutationStatus.MASUK
    })
    status: string;

    @Column({
        type: 'enum',
        enum: MutationType,
        default: MutationType.INPUT
    })
    type: string;

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP'})
    createdAt: Date;
}