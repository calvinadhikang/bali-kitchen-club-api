import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Category } from 'src/entities/category.entity';
import { Repository } from 'typeorm';
import { CreateCategoryDto } from './dto/create-category.dto';

@Injectable()
export class CategoryService {
    constructor(
        @InjectRepository(Category)
        private readonly categoryRepository: Repository<Category>
    ) {}

    async findAll(){
        return await this.categoryRepository.find();
    }

    async create(createCategoryDto: CreateCategoryDto){
        return await this.categoryRepository.save(createCategoryDto);
    }

    async delete(id: number) {
        return await this.categoryRepository.delete(id);
    }
}
