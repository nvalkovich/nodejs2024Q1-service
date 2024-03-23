import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Database } from 'src/database/database.module';
import { v4 } from 'uuid';
import { UserEntity } from './entities/user.entity';

@Injectable()
export class UsersService {
  private db = Database.getInstance();

  create(createUserDto: CreateUserDto) {
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

    return this.db.createUser(newUser);
  }

  findAll() {
    return this.db.getAllUsers();
  }

  findOne(params: { id: string }) {
    const user = this.db.getUserById(params.id);

    if (!user) {
      throw new NotFoundException('User not found');
    }

    return user;
  }

  update(params: { id: string }, updateUserDto: UpdateUserDto) {
    const user = this.db.getUserById(params.id);

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
      updatedAt: Date.now(),
    });

    return this.db.updateUser(updatedUser);
  }

  remove(params: { id: string }) {
    const user = this.db.getUserById(params.id);

    if (!user) {
      throw new NotFoundException('User not found');
    }

    return this.db.deleteUser(params.id);
  }
}
