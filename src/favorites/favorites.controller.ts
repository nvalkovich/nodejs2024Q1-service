import { Controller, Get, Post, Param, Delete, HttpCode } from '@nestjs/common';
import { FavoritesService } from './favorites.service';
import { IsNotEmpty, IsString, IsUUID } from 'class-validator';

class FindOneParams {
  @IsString()
  @IsNotEmpty()
  @IsUUID()
  id: string;
}

@Controller('favs')
export class FavoritesController {
  constructor(private readonly favoritesService: FavoritesService) {}

  @Post('track/:id')
  createTrack(@Param() params: FindOneParams) {
    return this.favoritesService.createTrack(params.id);
  }

  @Post('album/:id')
  createAlbum(@Param() params: FindOneParams) {
    return this.favoritesService.createAlbum(params.id);
  }

  @Post('artist/:id')
  createArtist(@Param() params: FindOneParams) {
    return this.favoritesService.createArtist(params.id);
  }

  @Get()
  findAll() {
    return this.favoritesService.findAll();
  }

  @Delete('album/:id')
  @HttpCode(204)
  removeAlbum(@Param() params: FindOneParams) {
    return this.favoritesService.removeAlbum(params.id);
  }

  @Delete('track/:id')
  @HttpCode(204)
  removeTrack(@Param() params: FindOneParams) {
    return this.favoritesService.removeTrack(params.id);
  }

  @Delete('artist/:id')
  @HttpCode(204)
  removeArtist(@Param() params: FindOneParams) {
    return this.favoritesService.removeArtist(params.id);
  }
}
