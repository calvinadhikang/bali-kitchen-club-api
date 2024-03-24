import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { SesiService } from './sesi.service';
import { CreateSesiDto } from './dto/create-sesi.dto';

@Controller('sesi')
export class SesiController {

    constructor(private readonly sesiService: SesiService){}

    @Get()
    getAll(){
        return this.sesiService.findAll()
    }

    @Get('now')
    getNow(){
        return this.sesiService.getSesiNow()
    }

    @Get(':id')
    getById(@Param('id') id: number){
        return this.sesiService.findById(id);
    }

    @Post('add')
    create(@Body() createSesiDto: CreateSesiDto){
        return this.sesiService.create(createSesiDto);
    }

    @Delete(':id')
    delete(@Param('id') id: number){
        return this.sesiService.delete(id);
    }
}
