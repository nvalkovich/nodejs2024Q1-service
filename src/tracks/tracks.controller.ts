import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  HttpCode,
  Put,
  UseGuards,
} from '@nestjs/common';
import { TracksService } from './tracks.service';
import { CreateTrackDto, FindOneParams } from './dto/create-track.dto';
import { UpdateTrackDto } from './dto/update-track.dto';
import { Track as TrackEntity } from './entities/track.entity';
import { JwtAuthGuard } from 'src/jwt-auth.guard';

@Controller('track')
export class TracksController {
  constructor(private readonly tracksService: TracksService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  async create(@Body() body: CreateTrackDto): Promise<TrackEntity> {
    const tracks = await this.tracksService.create(body);

    return tracks;
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  findAll() {
    return this.tracksService.findAll();
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  findOne(@Param() params: FindOneParams) {
    return this.tracksService.findOne(params.id);
  }

  @UseGuards(JwtAuthGuard)
  @Put(':id')
  update(
    @Param() params: FindOneParams,
    @Body() updateTrackDto: UpdateTrackDto,
  ) {
    return this.tracksService.update(params.id, updateTrackDto);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  @HttpCode(204)
  remove(@Param() params: FindOneParams) {
    return this.tracksService.remove(params.id);
  }
}
