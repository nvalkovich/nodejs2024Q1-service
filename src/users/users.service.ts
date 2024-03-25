import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Database } from 'src/database/database.module';
import { v4 } from 'uuid';
import { User, User as UserEntity } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {
  private db = Database.getInstance();

  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async create(createUserDto: CreateUserDto) {
    if (!createUserDto.password || !createUserDto.login) {
      throw new NotFoundException('User not found');
    }

    const newUser = new UserEntity({
      id: v4(),
      ...createUserDto,
      version: 1,
      createdAt: Date.now(),
      updatedAt: Date.now(),
    });

    const newUser2 = new UserEntity({
      id: v4(),
      ...createUserDto,
      version: 1,
    });

    const created = this.userRepository.create(newUser2);

    this.db.createUser(newUser);

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

    this.db.updateUser(updatedUser);

    return await this.userRepository.save(updatedUser);
  }

  async remove(params: { id: string }) {
    const { id } = params;
    const user = await this.userRepository.findOneBy({ id });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    this.db.deleteUser(id);

    return this.userRepository.delete(id);
  }
}
