import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import * as argon2 from 'argon2';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private usersRepository: Repository<User>,
  ) {}
  async create(createUserDto: CreateUserDto) {
    const { email, password } = createUserDto;

    const isExists = await this.usersRepository.exist({ where: { email } });

    if (isExists) throw new ForbiddenException('Credentials is already exists');

    const hashedPassword = await argon2.hash(password);

    const user = await this.usersRepository.create({
      email,
      password: hashedPassword,
    });

    await this.usersRepository.save(user);

    return { id: user.id, email: user.email };
  }

  async findByEmail(email: string) {
    const user = await this.usersRepository.findOneBy({
      email,
    });

    if (!user) throw new NotFoundException('User is not found');

    return user;
  }
}
