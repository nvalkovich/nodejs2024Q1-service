import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
  HttpCode,
  UseInterceptors,
  ClassSerializerInterceptor,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto, FindOneParams } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User as UserEntity } from './entities/user.entity';

@Controller('user')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}
  @UseInterceptors(ClassSerializerInterceptor)
  @Post()
  async create(
    @Body() createUserDto: CreateUserDto,
  ): Promise<Partial<UserEntity>> {
    const user = await this.usersService.create(createUserDto);

    const createdUser = {
      id: user.id,
      login: user.login,
      version: user.version,
      createdAt: Number(user.createdAt),
      updatedAt: Number(user.updatedAt),
    };

    return createdUser;
  }

  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  @Get(':id')
  findOne(@Param() params: FindOneParams) {
    return this.usersService.findOne(params);
  }

  @UseInterceptors(ClassSerializerInterceptor)
  @Put(':id')
  async update(
    @Param() params: FindOneParams,
    @Body() updateUserDto: UpdateUserDto,
  ): Promise<Partial<UserEntity>> {
    const user = await this.usersService.update(params, updateUserDto);
    const updatedUser = {
      id: user.id,
      login: user.login,
      version: user.version,
      createdAt: Number(user.createdAt),
      updatedAt: Number(user.updatedAt),
    };

    return updatedUser;
  }

  @Delete(':id')
  @HttpCode(204)
  remove(@Param() params: FindOneParams) {
    return this.usersService.remove(params);
  }
}
