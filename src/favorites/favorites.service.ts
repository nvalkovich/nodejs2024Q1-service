import {
  Injectable,
  NotFoundException,
  UnprocessableEntityException,
} from '@nestjs/common';

import { Database } from 'src/database/database.module';

@Injectable()
export class FavoritesService {
  private db = Database.getInstance();

  createTrack(id: string) {
    const track = this.db.getTrackById(id);

    if (!track) {
      throw new UnprocessableEntityException('Track not found');
    }

    return this.db.addTrackToFavorites(id);
  }

  createAlbum(id: string) {
    const album = this.db.getAlbumById(id);

    if (!album) {
      throw new UnprocessableEntityException('Album not found');
    }

    return this.db.addAlbumToFavorites(id);
  }

  createArtist(id: string) {
    const artist = this.db.getArtistById(id);

    if (!artist) {
      throw new UnprocessableEntityException('Artist not found');
    }

    return this.db.addArtistToFavorites(id);
  }

  findAll() {
    return this.db.getAllFavorites();
  }

  removeTrack(id: string) {
    const isTrackInFavorites = this.db.isTrackInFavorites(id);

    if (!isTrackInFavorites) {
      throw new NotFoundException('Corresponding track is not favorite');
    }

    return this.db.removeTrackFromFavorites(id);
  }

  removeAlbum(id: string) {
    const isAlbumInFavorites = this.db.isAlbumInFavorites(id);

    if (!isAlbumInFavorites) {
      throw new NotFoundException('Corresponding album is not favorite');
    }

    return this.db.removeAlbumFromFavorites(id);
  }

  removeArtist(id: string) {
    const isArtistInFavorites = this.db.isArtistInFavorites(id);

    if (!isArtistInFavorites) {
      throw new NotFoundException('Corresponding artist is not favorite');
    }

    return this.db.removeArtistFromFavorites(id);
  }
}
