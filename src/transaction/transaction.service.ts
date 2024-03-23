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

        private readonly sesiService: SesiService
    ){}

    async findAll(){
        return await this.headerRepository.find();
    }

    async findByTimeAndSesi(time:string, sesiId: string){
        const todayStart = new Date();
        todayStart.setHours(0, 0, 0, 0); // Set time to 00:01 AM

        const todayEnd = new Date();
        todayEnd.setHours(23, 59, 59, 999); // Set time to 23:59:59 PM

        let sesi: null | string | number = null;
        if (sesiId == 'now') {
            sesi = (await this.sesiService.getSesiNow()).id
        }else{
            sesi = parseInt(sesiId)
        }

        console.log(time)
        console.log(sesi)
        
        if (time == 'today') {
            if (sesi) {
                return await this.headerRepository.find({
                    where: {
                        sesi: sesi,
                        createdAt: Between(todayStart, todayEnd) // createdAt is between todayStart and todayEnd
                    }
                });
            }else{
                return await this.headerRepository.find({
                    where: {
                        createdAt: Between(todayStart, todayEnd) // createdAt is between todayStart and todayEnd
                    }
                });
            }
        }
        else if(time == 'past') {
            if (sesi) {
                return await this.headerRepository.find({
                    where: {
                        sesi: sesi,
                        createdAt: LessThan(todayStart) // createdAt is between todayStart and todayEnd
                    }
                });
            }else{
                return await this.headerRepository.find({
                    where: {
                        createdAt: LessThan(todayStart) // createdAt is between todayStart and todayEnd
                    }
                });
            }
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
        try {
            const header = await this.headerRepository.create(createTransactionDto)
            const sesi = await this.sesiService.getSesiNow();

            if (sesi == null) {
                throw new BadRequestException("Tidak ada Sesi penjualan yang sesuai")
            }

            header.sesi = sesi.id;
            await this.headerRepository.save(header);

            return header;
        } catch (error) {
            console.log(error)
            return error;
        }
    }

    async setLunas(header_id: number){
        try {
            await this.headerRepository.findOneByOrFail({id: 33})
            await this.headerRepository.update(33, { status: "Lunas" })
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
