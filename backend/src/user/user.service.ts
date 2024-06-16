import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { CreateUserParams } from '../common/utils/types';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  findAll(): Promise<User[]> {
    return this.usersRepository.find();
  }

  async findOne(id: number): Promise<User | null> {
    return this.usersRepository.findOne({ where: { user_id: id } });
  }

  async remove(id: number): Promise<void> {
    await this.usersRepository.delete(id);
  }

  async create_admin() {
    const existingUser = await this.usersRepository.findOne({ where: { user_email: 'adm@adm.com' } })
    if (!existingUser) {
        const newAdmin: CreateUserParams = this.usersRepository.create({
            user_name: "admin",
            user_password: "admin",
            user_email: "adm@adm.com",
        })
        return this.usersRepository.save(newAdmin)
    }
  }
}



