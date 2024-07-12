import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { v4 } from 'uuid';
import { User, User as UserEntity } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async create(createUserDto: CreateUserDto) {
    const newUser = new UserEntity({
      id: v4(),
      ...createUserDto,
      version: 1,
      refreshToken: null,
    });

    const created = this.userRepository.create(newUser);

    return await this.userRepository.save(created);
  }

  findAll() {
    return this.userRepository.find();
  }

  async findOne(params: { id: string }) {
    const { id } = params;
    const user = await this.userRepository.findOneBy({ id });
    if (!user) {
      throw new NotFoundException('User not found');
    }

    return user;
  }

  async findOneByLogin(login: string) {
    const user = await this.userRepository.findOne({
      where: {
        login,
      },
    });

    return user;
  }

  async update(params: { id: string }, updateUserDto: UpdateUserDto) {
    const { id } = params;
    const user = await this.userRepository.findOneBy({ id });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    if (user.password !== updateUserDto.oldPassword) {
      throw new ForbiddenException(
        'The old password does not match the current one',
      );
    }

    const updatedUser = new UserEntity({
      ...user,
      password: updateUserDto.newPassword,
      version: user.version + 1,
    });

    return await this.userRepository.save(updatedUser);
  }

  async updateRefreshToken(id: string, refreshToken: string | null) {
    const user = await this.userRepository.findOneBy({ id });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    const updatedUser = new UserEntity({
      ...user,
      refreshToken,
    });

    return await this.userRepository.save(updatedUser);
  }

  async remove(params: { id: string }) {
    const { id } = params;
    const user = await this.userRepository.findOneBy({ id });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    return this.userRepository.delete(id);
  }
}
