import { CreateStockDto } from './dto/create-stock.dto';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Menu } from 'src/entities/menu.entity';
import { StockMutation } from 'src/entities/stock-mutation.entity';
import { Repository } from 'typeorm';

@Injectable()
export class StockService {

    constructor(
        @InjectRepository(StockMutation)
        private readonly stockRepository: Repository<StockMutation>,

        @InjectRepository(Menu)
        private readonly menuRepository: Repository<Menu>
    ){}

    async getByMenuId(id: number){
        return await this.stockRepository.find({
            where: {
                menu: id
            },
            order: {
                createdAt: 'DESC'
            }
        })
    }

    async addByMenuId(createStockDto: CreateStockDto){
        let err = false
        let msg = "Success"
        try {
            //update menu Stock Count
            const menuToUpdate = await this.menuRepository.findOneBy({id: createStockDto.menu})
            const currentStock = menuToUpdate.stock
            menuToUpdate.stock = currentStock + createStockDto.qty
            await this.menuRepository.save(menuToUpdate)

            //create mutation Data
            let stockData = await this.stockRepository.create({
                menu: createStockDto.menu,
                qty: createStockDto.qty,
                reference: createStockDto.employee
            })
            await this.stockRepository.save(stockData)
        } catch (error) {
            err = true
            msg = error
        }

        return {
            error: err,
            message: msg
        }
    }
}
