import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateTrackDto } from './dto/create-track.dto';
import { UpdateTrackDto } from './dto/update-track.dto';
import { Database } from 'src/database/database.module';
import { v4 } from 'uuid';
import { TrackEntity } from './entities/track.entity';

@Injectable()
export class TracksService {
  private db = Database.getInstance();

  create(createTrackDto: CreateTrackDto) {
    if (!createTrackDto.name || !createTrackDto.duration) {
      throw new BadRequestException('There is no required fields');
    }

    const newTrack = new TrackEntity({
      id: v4(),
      ...createTrackDto,
      artistId: null,
      albumId: null,
    });

    console.log('NEWTRACK', newTrack);

    return this.db.createTrack(newTrack);
  }

  findAll() {
    return this.db.getAllTracks();
  }

  findOne(id: string) {
    const track = this.db.getTrackById(id);

    if (!track) {
      throw new NotFoundException('Track not found');
    }

    return track;
  }

  update(id: string, updateTrackDto: UpdateTrackDto) {
    const track = this.db.getTrackById(id);

    if (!track) {
      throw new NotFoundException('Track not found');
    }

    const updatedTrack = {
      ...track,
      ...updateTrackDto,
    };

    return this.db.updateTrack(updatedTrack);
  }

  remove(id: string) {
    const track = this.db.getTrackById(id);

    if (!track) {
      throw new NotFoundException('Track not found');
    }

    return this.db.deleteTrack(id);
  }
}
