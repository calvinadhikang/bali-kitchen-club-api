import { Body, Controller, Delete, Get, Patch, Param } from '@nestjs/common';
import { CategoryService } from './category.service';
import { UpdateCategoryDto } from './dto/update-category.dto';

@Controller('category')
export class CategoryController {

    constructor(private readonly categoryService: CategoryService) {}

    @Get()
    findAll(){
        return this.categoryService.findAll();
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
