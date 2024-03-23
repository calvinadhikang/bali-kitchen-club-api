import { CreateTransactionDto } from './dto/create-transaction.dto';
import { Body, Controller, Get, Param, Patch, Post, Query } from '@nestjs/common';
import { TransactionService } from './transaction.service';
import { time } from 'console';
import internal from 'stream';
import { Sesi } from 'src/entities/sesi.entity';

@Controller('transaction')
export class TransactionController {
    constructor(private readonly transactionService: TransactionService){}

    @Get()
    findAll(@Query('time') time: string = 'today', @Query('sesi') sesi: string = 'now'){
        if (time == undefined || time == "") {
            return this.transactionService.findAll();
        }else{
            return this.transactionService.findByTimeAndSesi(time, sesi)
        }
    }

    @Get(':id')
    findById(@Param('id') header_id: number){
        return this.transactionService.getDetail(header_id);
    }

    @Post()
    create(@Body() createTransactionDto: CreateTransactionDto){
        return this.transactionService.create(createTransactionDto)
    }

    @Patch(':id')
    setLunasById(@Param('id') header_id: number){
        return this.transactionService.setLunas(header_id)
    }
}
