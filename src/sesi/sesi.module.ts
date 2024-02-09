import { Module } from '@nestjs/common';
import { SesiController } from './sesi.controller';
import { SesiService } from './sesi.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Sesi } from 'src/entities/sesi.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Sesi])],
  controllers: [SesiController],
  providers: [SesiService],
  exports: [SesiService]
})
export class SesiModule {}
