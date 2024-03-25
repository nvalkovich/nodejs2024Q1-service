import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateArtistDto } from './dto/create-artist.dto';
import { UpdateArtistDto } from './dto/update-artist.dto';
import { v4 } from 'uuid';
import { Artist } from './entities/artist.entity';
import { Database } from 'src/database/database.module';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class ArtistsService {
  private db = Database.getInstance();

  constructor(
    @InjectRepository(Artist)
    private readonly artistRepository: Repository<Artist>,
  ) {}

  async create(createArtistDto: CreateArtistDto) {
    if (!createArtistDto.name || !createArtistDto.grammy) {
      throw new BadRequestException('There is no required fields');
    }

    const newArtist = new Artist({
      id: v4(),
      ...createArtistDto,
    });

    const created = this.artistRepository.create(newArtist);

    this.db.createArtist(newArtist);

    return await this.artistRepository.save(created);
  }

  findAll() {
    return this.artistRepository.find();
  }

  async findOne(id: string) {
    const artist = await this.artistRepository.findOneBy({ id });

    if (!artist) {
      throw new NotFoundException('Artist not found');
    }

    return artist;
  }

  async update(id: string, updateArtistDto: UpdateArtistDto) {
    const artist = await this.artistRepository.findOneBy({ id });

    if (!artist) {
      throw new NotFoundException('Artist not found');
    }

    const updatedArtist = {
      ...artist,
      ...updateArtistDto,
    };

    this.db.updateArtist(updatedArtist);

    return await this.artistRepository.save(updatedArtist);
  }

  async remove(id: string) {
    const artist = await this.artistRepository.findOneBy({ id });

    if (!artist) {
      throw new NotFoundException('Artist not found');
    }

    this.db.removeArtistFromFavorites(id);
    this.db.deleteArtist(id);

    return this.artistRepository.delete(id);
  }
}
