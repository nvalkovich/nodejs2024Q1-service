import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateArtistDto } from './dto/create-artist.dto';
import { UpdateArtistDto } from './dto/update-artist.dto';
import { v4 } from 'uuid';
import { ArtistEntity } from './entities/artist.entity';
import { Database } from 'src/database/database.module';

@Injectable()
export class ArtistsService {
  private db = Database.getInstance();

  create(createArtistDto: CreateArtistDto): ArtistEntity {
    if (!createArtistDto.name || !createArtistDto.grammy) {
      throw new BadRequestException('There is no required fields');
    }

    const newArtist = new ArtistEntity({
      id: v4(),
      ...createArtistDto,
    });

    return this.db.createArtist(newArtist);
  }

  findAll() {
    return this.db.getAllArtists();
  }

  findOne(id: string) {
    const artist = this.db.getArtistById(id);

    if (!artist) {
      throw new NotFoundException('Artist not found');
    }

    return artist;
  }

  update(id: string, updateArtistDto: UpdateArtistDto) {
    const artist = this.db.getArtistById(id);

    if (!artist) {
      throw new NotFoundException('Artist not found');
    }

    const updatedArtist = {
      ...artist,
      ...updateArtistDto,
    };

    return this.db.updateArtist(updatedArtist);
  }

  remove(id: string) {
    const artist = this.db.getArtistById(id);

    if (!artist) {
      throw new NotFoundException('Artist not found');
    }

    return this.db.deleteArtist(id);
  }
}
