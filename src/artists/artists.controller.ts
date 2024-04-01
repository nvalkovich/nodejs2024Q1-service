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
import { ArtistsService } from './artists.service';
import { CreateArtistDto, FindOneParams } from './dto/create-artist.dto';
import { UpdateArtistDto } from './dto/update-artist.dto';
import { JwtAuthGuard } from 'src/jwt-auth.guard';

@Controller('artist')
export class ArtistsController {
  constructor(private readonly artistsService: ArtistsService) {}
  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Body() createArtistDto: CreateArtistDto) {
    return this.artistsService.create(createArtistDto);
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  findAll() {
    return this.artistsService.findAll();
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  findOne(@Param() params: FindOneParams) {
    return this.artistsService.findOne(params.id);
  }

  @UseGuards(JwtAuthGuard)
  @Put(':id')
  update(
    @Param() params: FindOneParams,
    @Body() updateArtistDto: UpdateArtistDto,
  ) {
    return this.artistsService.update(params.id, updateArtistDto);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  @HttpCode(204)
  remove(@Param() params: FindOneParams) {
    return this.artistsService.remove(params.id);
  }
}
