import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
  HttpCode,
} from '@nestjs/common';
import { AlbumsService } from './albums.service';
import { CreateAlbumDto, FindOneParams } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';

@Controller('album')
export class AlbumsController {
  constructor(private readonly albumsService: AlbumsService) {}

  @Post()
  create(@Body() createAlbumDto: CreateAlbumDto) {
    return this.albumsService.create(createAlbumDto);
  }

  @Get()
  findAll() {
    return this.albumsService.findAll();
  }

  @Get(':id')
  findOne(@Param() params: FindOneParams) {
    return this.albumsService.findOne(params.id);
  }

  @Put(':id')
  update(
    @Param() params: FindOneParams,
    @Body() updateAlbumDto: UpdateAlbumDto,
  ) {
    return this.albumsService.update(params.id, updateAlbumDto);
  }

  @Delete(':id')
  @HttpCode(204)
  remove(@Param() params: FindOneParams) {
    return this.albumsService.remove(params.id);
  }
}
