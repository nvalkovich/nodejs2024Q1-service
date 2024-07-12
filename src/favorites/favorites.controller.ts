import {
  Controller,
  Get,
  Post,
  Param,
  Delete,
  HttpCode,
  UseGuards,
} from '@nestjs/common';
import { FavoritesService } from './favorites.service';
import { IsNotEmpty, IsString, IsUUID } from 'class-validator';
import { JwtAuthGuard } from 'src/jwt-auth.guard';

class FindOneParams {
  @IsString()
  @IsNotEmpty()
  @IsUUID()
  id: string;
}

@Controller('favs')
export class FavoritesController {
  constructor(private readonly favoritesService: FavoritesService) {}

  @UseGuards(JwtAuthGuard)
  @Post('track/:id')
  createTrack(@Param() params: FindOneParams) {
    return this.favoritesService.createTrack(params.id);
  }

  @UseGuards(JwtAuthGuard)
  @Post('album/:id')
  createAlbum(@Param() params: FindOneParams) {
    return this.favoritesService.createAlbum(params.id);
  }

  @UseGuards(JwtAuthGuard)
  @Post('artist/:id')
  createArtist(@Param() params: FindOneParams) {
    return this.favoritesService.createArtist(params.id);
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  findAll() {
    return this.favoritesService.findAll();
  }

  @UseGuards(JwtAuthGuard)
  @Delete('album/:id')
  @HttpCode(204)
  removeAlbum(@Param() params: FindOneParams) {
    return this.favoritesService.removeAlbum(params.id);
  }

  @UseGuards(JwtAuthGuard)
  @Delete('track/:id')
  @HttpCode(204)
  removeTrack(@Param() params: FindOneParams) {
    return this.favoritesService.removeTrack(params.id);
  }

  @UseGuards(JwtAuthGuard)
  @Delete('artist/:id')
  @HttpCode(204)
  removeArtist(@Param() params: FindOneParams) {
    return this.favoritesService.removeArtist(params.id);
  }
}
