import { Menu } from './entities/menu.entity';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MenuModule } from './menu/menu.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CategoryModule } from './category/category.module';
import { Category } from './entities/category.entity';
import { HeadertransactionModule } from './headertransaction/headertransaction.module';
import { DetailtransactionModule } from './detailtransaction/detailtransaction.module';
import { UserModule } from './user/user.module';
import { HeaderTransaction } from './entities/header-transaction.entity';
import { DetailTransaction } from './entities/detail-transaction.entity';
import { User } from './entities/user.entity';
import { SesiModule } from './sesi/sesi.module';
import { Sesi } from './entities/sesi.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '',
      database: 'bkc',
      entities: [Menu, Category, HeaderTransaction, DetailTransaction, User, Sesi],
      synchronize: true,
    }),
    MenuModule,
    CategoryModule,
    HeadertransactionModule,
    DetailtransactionModule,
    UserModule,
    SesiModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
