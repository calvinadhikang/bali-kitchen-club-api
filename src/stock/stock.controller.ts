import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { StockService } from './stock.service';
import { CreateStockDto } from './dto/create-stock.dto';

@Controller('stock')
export class StockController {

    constructor(private readonly stockService: StockService){}

    @Get(':id')
    findByMenuId(@Param('id') id: number){
        return this.stockService.getByMenuId(id);
    }

    @Post('add')
    addMutationByMenuId(@Body() createStockDto: CreateStockDto){
        return this.stockService.addByMenuId(createStockDto);
    }
}
