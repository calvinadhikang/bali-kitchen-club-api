import { Menu } from '../entities/menu.entity';
import { Injectable } from '@nestjs/common';
import { CreateMenuDto } from './dto/create-menu.dto';
import { UpdateMenuDto } from './dto/update-menu.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Category } from 'src/entities/category.entity';

@Injectable()
export class MenuService {

    constructor(
        @InjectRepository(Menu)
        private menuRepository: Repository<Menu>,
    ) {}

    async create(createMenuDto: CreateMenuDto) {
        var err = false
        try {
            await this.menuRepository.save(createMenuDto);
        } catch (error) {
            err = true
        }

        return {
            error: err,
            message: "Success"
        }
    }

    async findAll() {
        return await this.menuRepository.find();
    }

    async findOneById(id: number) {
        return await this.menuRepository.findOneBy({id: id});
    }

    async findAllByCategory(category: string){
        if (category == "All") {
            return await this.menuRepository.find();
        }
        return await this.menuRepository.findBy({category: category});
    }

    async update(id: number, updateMenuDto: UpdateMenuDto) {
        await this.menuRepository.update(id, updateMenuDto)
        return await this.menuRepository.findOneBy({id: id});
    }

    async remove(id: number) {
        return await this.menuRepository.delete(id);
    }

    async getMenuTransaction(){
        let result = await this.menuRepository.find();
        let temp = []
        result.forEach(element => {
            const newObj = { ...element, qty: 0 }
            temp.push(newObj)
        });

        return temp
    }
}
