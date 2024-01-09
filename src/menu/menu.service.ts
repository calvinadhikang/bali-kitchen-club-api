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
    return await this.menuRepository.save(createMenuDto);
  }

  async findAll() {
    return await this.menuRepository.find();
  }

  async findOneById(id: number) {
    return await this.menuRepository.findOneBy({id: id});
  }

  async findAllByCategory(category: string){
    return await this.menuRepository.findBy({category: category});
  }

  async update(id: number, updateMenuDto: UpdateMenuDto) {
    await this.menuRepository.update(id, updateMenuDto)
    return await this.menuRepository.findOneBy({id: id});
  }

  async remove(id: number) {
    return await this.menuRepository.delete(id);
  }
}
