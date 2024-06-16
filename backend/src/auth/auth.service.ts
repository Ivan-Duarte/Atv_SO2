import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../user/user.entity';
import { LoginDto } from '../common/dtos/login.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async validateUser(loginDto: LoginDto): Promise<User> {
    const { user_email, user_password } = loginDto;
    const user = await this.usersRepository.findOne({ where: { user_email } });

    if (user && user.user_password === user_password) {
      return user;
    }
    throw new UnauthorizedException('Invalid credentials');
  }
}

