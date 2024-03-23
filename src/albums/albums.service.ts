import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';
import { Database } from 'src/database/database.module';
import { v4 } from 'uuid';
import { AlbumEntity } from './entities/album.entity';

@Injectable()
export class AlbumsService {
  private db = Database.getInstance();

  create(createAlbumDto: CreateAlbumDto) {
    if (!createAlbumDto.name || !createAlbumDto.year) {
      throw new BadRequestException('There is no required fields');
    }

    const newAlbum = new AlbumEntity({
      id: v4(),
      artistId: null,
      ...createAlbumDto,
    });

    return this.db.createAlbum(newAlbum);
  }

  findAll() {
    return this.db.getAllAlbums();
  }

  findOne(id: string) {
    const album = this.db.getAlbumById(id);

    if (!album) {
      throw new NotFoundException('Album not found');
    }

    return album;
  }

  update(id: string, updateAlbumDto: UpdateAlbumDto) {
    const album = this.db.getAlbumById(id);

    if (!album) {
      throw new NotFoundException('Album not found');
    }

    const updatedAlbum = new AlbumEntity({
      ...album,
      ...updateAlbumDto,
    });

    return this.db.updateAlbum(updatedAlbum);
  }

  remove(id: string) {
    const album = this.db.getAlbumById(id);

    if (!album) {
      throw new NotFoundException('Album not found');
    }

    this.db.removeAlbumFromFavorites(id);

    return this.db.deleteAlbum(id);
  }
}
