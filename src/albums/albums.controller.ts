import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
  HttpCode,
  UseGuards,
} from '@nestjs/common';
import { AlbumsService } from './albums.service';
import { CreateAlbumDto, FindOneParams } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';
import { JwtAuthGuard } from 'src/jwt-auth.guard';

@Controller('album')
export class AlbumsController {
  constructor(private readonly albumsService: AlbumsService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Body() createAlbumDto: CreateAlbumDto) {
    return this.albumsService.create(createAlbumDto);
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  findAll() {
    return this.albumsService.findAll();
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  findOne(@Param() params: FindOneParams) {
    return this.albumsService.findOne(params.id);
  }

  @UseGuards(JwtAuthGuard)
  @Put(':id')
  update(
    @Param() params: FindOneParams,
    @Body() updateAlbumDto: UpdateAlbumDto,
  ) {
    return this.albumsService.update(params.id, updateAlbumDto);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  @HttpCode(204)
  remove(@Param() params: FindOneParams) {
    return this.albumsService.remove(params.id);
  }
}
