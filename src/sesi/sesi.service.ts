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
}   
