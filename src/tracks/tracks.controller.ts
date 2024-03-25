import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  HttpCode,
  Put,
} from '@nestjs/common';
import { TracksService } from './tracks.service';
import { CreateTrackDto, FindOneParams } from './dto/create-track.dto';
import { UpdateTrackDto } from './dto/update-track.dto';
import { Track as TrackEntity } from './entities/track.entity';

@Controller('track')
export class TracksController {
  constructor(private readonly tracksService: TracksService) {}

  @Post()
  async create(@Body() body: CreateTrackDto): Promise<TrackEntity> {
    const tracks = await this.tracksService.create(body);

    return tracks;
  }

  @Get()
  findAll() {
    return this.tracksService.findAll();
  }

  @Get(':id')
  findOne(@Param() params: FindOneParams) {
    return this.tracksService.findOne(params.id);
  }

  @Put(':id')
  update(
    @Param() params: FindOneParams,
    @Body() updateTrackDto: UpdateTrackDto,
  ) {
    return this.tracksService.update(params.id, updateTrackDto);
  }

  @Delete(':id')
  @HttpCode(204)
  remove(@Param() params: FindOneParams) {
    return this.tracksService.remove(params.id);
  }
}
