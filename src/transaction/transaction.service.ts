import { SesiService } from './../sesi/sesi.service';
import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DetailTransaction } from 'src/entities/detail-transaction.entity';
import { HeaderTransaction } from 'src/entities/header-transaction.entity';
import { Between, LessThan, NumericType, Repository } from 'typeorm';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { User } from 'src/entities/user.entity';
import { Sesi } from 'src/entities/sesi.entity';
import { Menu } from 'src/entities/menu.entity';
import { MutationStatus, MutationType, StockMutation } from 'src/entities/stock-mutation.entity';

@Injectable()
export class TransactionService {

    constructor(
        @InjectRepository(HeaderTransaction)
        private readonly headerRepository: Repository<HeaderTransaction>,

        @InjectRepository(DetailTransaction)
        private readonly detailRepository: Repository<DetailTransaction>,

        @InjectRepository(Menu)
        private readonly menuRepository: Repository<Menu>,

        @InjectRepository(User)
        private readonly userRepository: Repository<User>,
        
        @InjectRepository(Sesi)
        private readonly sesiRepository: Repository<Sesi>,

        @InjectRepository(StockMutation)
        private readonly stockRepository: Repository<StockMutation>,

        private readonly sesiService: SesiService
    ){}

    async findAll(){
        return await this.headerRepository.find();
    }

    async findByTimeAndSesi(time:string, sesiId: number){
        const todayStart = new Date();
        todayStart.setHours(0, 0, 0, 0); // Set time to 00:01 AM
        
        const todayEnd = new Date();
        todayEnd.setHours(23, 59, 59, 999); // Set time to 23:59:59 PM
        
        let transactionList = [];
        let sesi = sesiId

        if (sesiId <= 0) {
            let sesiNow = (await this.sesiService.getSesiNow())
            if (sesiNow != null) {
                sesi = sesiNow.id
            }
        }

        if (time == 'today') {
            if (sesi) {
                transactionList = await this.headerRepository.find({
                    where: {
                        sesi: sesi,
                        createdAt: Between(todayStart, todayEnd) // createdAt is between todayStart and todayEnd
                    },
                    order: {
                        createdAt: 'DESC'
                    }
                });
            }else{
                transactionList = await this.headerRepository.find({
                    where: {
                        createdAt: Between(todayStart, todayEnd) // createdAt is between todayStart and todayEnd
                    },
                    order: {
                        createdAt: 'DESC'
                    }
                });
            }
        }
        else if(time == 'past') {
            if (sesi) {
                transactionList = await this.headerRepository.find({
                    where: {
                        sesi: sesi,
                        createdAt: LessThan(todayStart) // createdAt is between todayStart and todayEnd
                    },
                    order: {
                        createdAt: 'DESC'
                    }
                });
            }else{
                transactionList = await this.headerRepository.find({
                    where: {
                        createdAt: LessThan(todayStart) // createdAt is between todayStart and todayEnd
                    },
                    order: {
                        createdAt: 'DESC'
                    }
                });
            }
        }

        let grandTotal = 0
        let totalEarnings = 0
        transactionList.forEach((trans) => {
            if (trans.status == "Lunas") {
                totalEarnings += trans.grand_total
            }
            grandTotal += trans.grand_total
        })

        return {
            data: transactionList,
            total_earning: totalEarnings,
            grand_total: grandTotal
        }
    }

    async getDetail(header_id: number){
        try {
            const header = await this.headerRepository.findOne({
                where: {
                    id: header_id    
                },
                relations: ['details']
            });

            const result = { 
                ...header, 
                employee_detail: await this.userRepository.findOne({where: {id: header.employee}}), 
            }

            return result
        } catch (error) {
            throw new NotFoundException('Transaction not found');
        }
    }

    async create(createTransactionDto: CreateTransactionDto){
        let err = false
        let msg = "Success"
        
        try {
            const header = await this.headerRepository.create(createTransactionDto)
            const sesi = await this.sesiService.getSesiNow();

            if (sesi == null) {
                throw new BadRequestException("Tidak ada Sesi penjualan yang sesuai")
            }

            header.sesi = sesi.id;
            await this.headerRepository.save(header);

            for (const detail of header.details){
                const menuToUpdate = await this.menuRepository.findOneBy({id: detail.menu})
                const currentStock = menuToUpdate.stock

                menuToUpdate.stock = currentStock - detail.qty
                await this.menuRepository.save(menuToUpdate)

                //create stock mutation
                let stock = await this.stockRepository.create({
                    menu: detail.menu,
                    qty: detail.qty,
                    reference: header.id,
                    status: MutationStatus.KELUAR,
                    type: MutationType.TRANSAKSI
                })
                await this.stockRepository.save(stock)
            }
        } catch (error) {
            err = true
            msg = error
        }

        return {
            error: err,
            message: msg
        }
    }

    async setLunas(header_id: number){
        try {
            await this.headerRepository.findOneByOrFail({id: header_id})
            await this.headerRepository.update(header_id, { status: "Lunas" })
            return {
                error: false,
                message: "Berhasil Update Status"
            }
        } catch (error) {
            return {
                error: true,
                message: "Gagal Update Status, Transaksi Tidak Ditemukan !"
            }
        }
    }
}
