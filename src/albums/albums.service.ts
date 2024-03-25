import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';
import { v4 } from 'uuid';
import { Album } from './entities/album.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class AlbumsService {
  constructor(
    @InjectRepository(Album)
    private readonly albumRepository: Repository<Album>,
  ) {}

  async create(createAlbumDto: CreateAlbumDto) {
    if (!createAlbumDto.name || !createAlbumDto.year) {
      throw new BadRequestException('There is no required fields');
    }

    const newAlbum = new Album({
      id: v4(),
      artistId: null,
      artist: null,
      ...createAlbumDto,
    });

    const created = this.albumRepository.create(newAlbum);

    return await this.albumRepository.save(created);
  }

  findAll() {
    return this.albumRepository.find();
  }

  async findOne(id: string) {
    const album = await this.albumRepository.findOneBy({ id });

    console.log('ALBUM,', album);

    if (!album) {
      throw new NotFoundException('Album not found');
    }

    return album;
  }

  async update(id: string, updateAlbumDto: UpdateAlbumDto) {
    const album = await this.albumRepository.findOneBy({ id });

    if (!album) {
      throw new NotFoundException('Album not found');
    }

    const updatedAlbum = new Album({
      ...album,
      ...updateAlbumDto,
    });

    return await this.albumRepository.save(updatedAlbum);
  }

  async remove(id: string) {
    const album = await this.albumRepository.findOneBy({ id });

    if (!album) {
      throw new NotFoundException('Album not found');
    }

    return this.albumRepository.delete(id);
  }
}
