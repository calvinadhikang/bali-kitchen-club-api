import { Menu } from './entities/menu.entity';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MenuModule } from './menu/menu.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CategoryModule } from './category/category.module';
import { Category } from './entities/category.entity';
import { UserModule } from './user/user.module';
import { HeaderTransaction } from './entities/header-transaction.entity';
import { DetailTransaction } from './entities/detail-transaction.entity';
import { User } from './entities/user.entity';
import { SesiModule } from './sesi/sesi.module';
import { Sesi } from './entities/sesi.entity';
import { TransactionModule } from './transaction/transaction.module';
import { StockModule } from './stock/stock.module';
import { StockMutation } from './entities/stock-mutation.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      // synchronize: true,
      // username: 'root',
      // password: '',
      // database: 'bkc',
      entities: [Menu, Category, User, Sesi, HeaderTransaction, DetailTransaction, StockMutation],
      username: 'nanaspos_bkc',
      password: 'calvinadhikang02',
      database: 'nanaspos_bkc',
    }),
    MenuModule,
    CategoryModule,
    UserModule,
    SesiModule,
    TransactionModule,
    StockModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
