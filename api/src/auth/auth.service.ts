import { ForbiddenException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../users/entities/user.entity';
import { Repository } from 'typeorm';
import { LoginDto } from './dto/login.dto';
import * as argon2 from 'argon2';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User) private usersRepository: Repository<User>,
    private jwt: JwtService,
  ) {}

  async login(dto: LoginDto) {
    const { email, password } = dto;

    const user = await this.usersRepository.findOneBy({ email });

    if (!user) throw new ForbiddenException('Invalid credentials');

    const isPasswordMatch = await argon2.verify(user.password, password);

    if (!isPasswordMatch) throw new ForbiddenException('Invalid credentials');

    return await this.generateToken({ sub: user.id, email: user.email });
  }

  async generateToken(payload: { sub: number; email: string }) {
    const accessToken = await this.jwt.signAsync(payload);

    return { access_token: accessToken };
  }
}
