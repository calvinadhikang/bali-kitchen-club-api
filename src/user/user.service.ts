import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/entities/user.entity';
import { CustomRepositoryNotFoundError, Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>
    ) {}

    async register(createUserDto: CreateUserDto){
        return this.userRepository.save(createUserDto);
    }

    async login(username: string, password: string){
        try {
            return await this.userRepository.findOneByOrFail({username: username, password: password});
        } catch (error) {
            throw new NotFoundException('User not found');
        }
    }

    async getStaffs(){
        return this.userRepository.findBy({role: "Staffs"});
    }
}
