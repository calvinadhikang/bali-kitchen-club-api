import { Module } from '@nestjs/common';
import { TransactionController } from './transaction.controller';
import { TransactionService } from './transaction.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HeaderTransaction } from 'src/entities/header-transaction.entity';
import { DetailTransaction } from 'src/entities/detail-transaction.entity';

@Module({
  imports: [TypeOrmModule.forFeature([HeaderTransaction, DetailTransaction])],
  controllers: [TransactionController],
  providers: [TransactionService]
})
export class TransactionModule {}
