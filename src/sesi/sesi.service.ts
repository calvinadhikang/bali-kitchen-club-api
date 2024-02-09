import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Sesi } from 'src/entities/sesi.entity';
import { Repository } from 'typeorm';
import { CreateSesiDto } from './dto/create-sesi.dto';

@Injectable()
export class SesiService {
    
    constructor(
        @InjectRepository(Sesi)
        private readonly sesiRepository: Repository<Sesi>
    ) {} 

    async findAll(){
        return await this.sesiRepository.find();
    }

    async findById(id: number){
        return await this.sesiRepository.findOneBy({id: id});
    }
    
    async create(createSesiDto: CreateSesiDto){
        return await this.sesiRepository.save(createSesiDto);
    }

    async delete(id: number){
        return await this.sesiRepository.delete(id);
    }

    async getSesiNow(){
        const now = new Date();
        const currentHour = now.getHours();
        const currentMinute = now.getMinutes();
        const currentTime = currentHour * 60 + currentMinute; // Convert current time to minutes

        // Construct the query to find the session where the current time is within the start and end time range
        const sesi = await this.sesiRepository
        .createQueryBuilder('sesi')
        .where('sesi.start <= :currentTime', { currentTime: `${currentHour.toString().padStart(2, '0')}:${currentMinute.toString().padStart(2, '0')}` })
        .andWhere('sesi.end >= :currentTime', { currentTime: `${currentHour.toString().padStart(2, '0')}:${currentMinute.toString().padStart(2, '0')}` })
        .getOne();

        return sesi || null;
    }
}   
