import { Body, Controller, Delete, Get, Patch, Param, Post } from '@nestjs/common';
import { CategoryService } from './category.service';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { CreateCategoryDto } from './dto/create-category.dto';

@Controller('category')
export class CategoryController {

    constructor(private readonly categoryService: CategoryService) {}

    @Get()
    findAll(){
        return this.categoryService.findAll();
    }

    @Get(':name')
    findByName(@Param('name') name: string){
        return this.categoryService.findById(name);
    }

    @Post('add')
    create(@Body() createCategoryDto: CreateCategoryDto){
        return this.categoryService.create(createCategoryDto);
    }

    @Patch(':id')
    update (@Param('id') id: number, @Body() updateCategoryDto: UpdateCategoryDto){
        return this.categoryService.update(id, updateCategoryDto);
    }

    @Delete(':id')
    delete(@Param('id') id: number){
        return this.categoryService.delete(id);
    }
}
