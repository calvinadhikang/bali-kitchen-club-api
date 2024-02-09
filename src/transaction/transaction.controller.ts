import { CreateTransactionDto } from './dto/create-transaction.dto';
import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { TransactionService } from './transaction.service';

@Controller('transaction')
export class TransactionController {
    constructor(private readonly transactionService: TransactionService){}

    @Get()
    findAll(){
        return this.transactionService.findAll();
    }

    @Get(':id')
    findById(@Param('id') header_id: number){
        return this.transactionService.getDetail(header_id);
    }

    @Post()
    create(@Body() createTransactionDto: CreateTransactionDto){
        return this.transactionService.create(createTransactionDto)
    }
}
