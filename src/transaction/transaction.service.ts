import { SesiService } from './../sesi/sesi.service';
import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DetailTransaction } from 'src/entities/detail-transaction.entity';
import { HeaderTransaction } from 'src/entities/header-transaction.entity';
import { EntityManager, LessThan, MoreThan, Repository, Transaction } from 'typeorm';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { User } from 'src/entities/user.entity';
import { createHash } from 'crypto';
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

    async getDetail(header_id: number){
        try {
            const header = await this.headerRepository.findOne({
                where: {
                    id: header_id    
                },
                relations: ['details']
            });

            const result = { ...header, employee: await this.userRepository.findOne({where: {id: header.employee}}) }
            return result
        } catch (error) {
            throw new NotFoundException('Transaction not found')
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
}
