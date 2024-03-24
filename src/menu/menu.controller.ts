import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { MenuService } from './menu.service';
import { CreateMenuDto } from './dto/create-menu.dto';
import { UpdateMenuDto } from './dto/update-menu.dto';

@Controller('menu')
export class MenuController {
    constructor(private readonly menuService: MenuService) {}

    @Post('add')
    create(@Body() createMenuDto: CreateMenuDto) {
        return this.menuService.create(createMenuDto);
    }

    @Get()
    findAll() {
        return this.menuService.findAll();
    }

    @Get('/transaction')
    getMenuTransaction() {
        return this.menuService.getMenuTransaction();
    }

    @Get(':id')
    findOne(@Param('id') id: number) {
        return this.menuService.findOneById(id);
    }

    @Get('/category/:category')
    findById(@Param('category') category: string) {
        return this.menuService.findAllByCategory(category);
    }

    @Patch(':id')
    update(@Param('id') id: number, @Body() updateMenuDto: UpdateMenuDto) {
        return this.menuService.update(id, updateMenuDto);
    }

    @Delete(':id')
    remove(@Param('id') id: number) {
        return this.menuService.remove(id);
    }
}
