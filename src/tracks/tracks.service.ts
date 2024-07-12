import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateTrackDto } from './dto/create-track.dto';
import { UpdateTrackDto } from './dto/update-track.dto';
import { v4 } from 'uuid';
import { Track } from './entities/track.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { FavTracks } from 'src/favorites/entities/favorites.entity';

@Injectable()
export class TracksService {
  constructor(
    @InjectRepository(Track)
    private readonly trackRepository: Repository<Track>,
    @InjectRepository(FavTracks)
    private readonly favTracksRepository: Repository<FavTracks>,
  ) {}

  async create(createTrackDto: CreateTrackDto) {
    if (!createTrackDto.name || !createTrackDto.duration) {
      throw new BadRequestException('There is no required fields');
    }

    const newTrack = new Track({
      id: v4(),
      artistId: null,
      albumId: null,
      ...createTrackDto,
    });

    const created = this.trackRepository.create(newTrack);

    return await this.trackRepository.save(created);
  }

  findAll() {
    return this.trackRepository.find();
  }

  async findOne(id: string) {
    const track = await this.trackRepository.findOneBy({ id });

    if (!track) {
      throw new NotFoundException('Track not found');
    }

    return track;
  }

  async update(id: string, updateTrackDto: UpdateTrackDto) {
    const track = await this.trackRepository.findOneBy({ id });

    if (!track) {
      throw new NotFoundException('Track not found');
    }

    const updatedTrack = {
      ...track,
      ...updateTrackDto,
    };

    return await this.trackRepository.save(updatedTrack);
  }

  async remove(id: string) {
    const track = await this.trackRepository.findOneBy({ id });

    if (!track) {
      throw new NotFoundException('Track not found');
    }

    this.favTracksRepository.delete(id);

    return await this.trackRepository.delete(id);
  }
}
