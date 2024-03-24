import { Module } from '@nestjs/common';
import { StockController } from './stock.controller';
import { StockService } from './stock.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StockMutation } from 'src/entities/stock-mutation.entity';
import { Menu } from 'src/entities/menu.entity';

@Module({
  imports: [TypeOrmModule.forFeature([StockMutation, Menu])],
  controllers: [StockController],
  providers: [StockService]
})
export class StockModule {}
