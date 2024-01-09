import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Category } from 'src/entities/category.entity';
import { Repository } from 'typeorm';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { UUID } from 'typeorm/driver/mongodb/bson.typings';

@Injectable()
export class CategoryService {
    constructor(
        @InjectRepository(Category)
        private readonly categoryRepository: Repository<Category>
    ) {}

    async findAll(){
        return await this.categoryRepository.find();
    }

    async findById(name: string){
        return await this.categoryRepository.findOneBy({name: name});
    }

    async create(createCategoryDto: CreateCategoryDto){
        return await this.categoryRepository.save(createCategoryDto);
    }

    async delete(id: number) {
        return await this.categoryRepository.delete(id);
    }

    async update(id: number, updateCategoryDto: UpdateCategoryDto){
        return await this.categoryRepository.update(id, updateCategoryDto);
    }
}
