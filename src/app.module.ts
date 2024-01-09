import { Menu } from './menu/entities/menu.entity';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MenuModule } from './menu/menu.module';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '',
      database: 'bkc',
      entities: [Menu],
      synchronize: true,
    }),
    MenuModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
