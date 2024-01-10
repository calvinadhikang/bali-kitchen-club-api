import { Injectable, NotFoundException } from '@nestjs/common';
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
        private readonly sesiRepository: Repository<Sesi>
    ){}

    async findAll(){
        return await this.headerRepository.find();
    }

    async getDetail(header_id: number){
        try {
            return await this.headerRepository.findOneByOrFail({id: header_id});
        } catch (error) {
            throw new NotFoundException('Transaction not found')
        }
    }

    async create(createTransactionDto: CreateTransactionDto){
        try {
            await this.headerRepository.manager.transaction(async manager => {
                const currentTime = new Date();
                const employee = await this.userRepository.findOneBy({id: createTransactionDto.employee_id});
                const sesi = await this.sesiRepository.findOne({
                    where: {
                        start: LessThan(currentTime),
                        end: MoreThan(currentTime)
                    }
                })

                const listDetails = [];
                createTransactionDto.details.forEach(async (element) => {
                    const menu = await this.menuRepository.findOneBy({id: element.menu_id});

                    const detail = await this.detailRepository.create({
                        menu: menu,
                        price: element.price,
                        qty: element.qty,
                        subtotal: element.subtotal
                    })
                });

                const header = this.headerRepository.create({
                    customer: createTransactionDto.customer,
                    total: createTransactionDto.total,
                    grand_total: createTransactionDto.grand_total,
                    tax: createTransactionDto.tax,
                    tax_value: createTransactionDto.tax_value,
                    employee: employee,
                    sesi: sesi
                })

                await manager.save(header)   
            })
        } catch (error) {
            
        }
    }
}
