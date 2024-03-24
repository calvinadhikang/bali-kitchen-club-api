import { Module } from '@nestjs/common';
import { TransactionController } from './transaction.controller';
import { TransactionService } from './transaction.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HeaderTransaction } from 'src/entities/header-transaction.entity';
import { DetailTransaction } from 'src/entities/detail-transaction.entity';
import { Menu } from 'src/entities/menu.entity';
import { User } from 'src/entities/user.entity';
import { Sesi } from 'src/entities/sesi.entity';
import { SesiModule } from 'src/sesi/sesi.module';
import { StockMutation } from 'src/entities/stock-mutation.entity';

@Module({
  imports: [TypeOrmModule.forFeature([HeaderTransaction, DetailTransaction, Menu, User, Sesi, StockMutation]), SesiModule],
  controllers: [TransactionController],
  providers: [TransactionService]
})
export class TransactionModule {}
