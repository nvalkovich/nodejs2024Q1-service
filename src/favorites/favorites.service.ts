import {
  Injectable,
  NotFoundException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { FavAlbums, FavArtists, FavTracks } from './entities/favorites.entity';
import { Album } from 'src/albums/entities/album.entity';
import { Artist } from 'src/artists/entities/artist.entity';
import { Track } from 'src/tracks/entities/track.entity';

@Injectable()
export class FavoritesService {
  constructor(
    @InjectRepository(Album)
    private readonly albumsRepository: Repository<Album>,
    @InjectRepository(FavAlbums)
    private readonly favAlbumsRepository: Repository<FavAlbums>,
    @InjectRepository(Artist)
    private readonly artistsRepository: Repository<Artist>,
    @InjectRepository(FavArtists)
    private readonly favArtistsRepository: Repository<FavArtists>,
    @InjectRepository(Track)
    private readonly tracksRepository: Repository<Track>,
    @InjectRepository(FavTracks)
    private readonly favTracksRepository: Repository<FavTracks>,
  ) {}

  async createTrack(id: string) {
    const track = await this.tracksRepository.findOneBy({ id });

    if (!track) {
      throw new UnprocessableEntityException('Track not found');
    }

    const favTrack = this.favTracksRepository.create(track);
    return await this.favTracksRepository.save(favTrack);
  }

  async createAlbum(id: string) {
    const album = await this.albumsRepository.findOneBy({ id });

    if (!album) {
      throw new UnprocessableEntityException('Album not found');
    }

    const favAlbum = this.favAlbumsRepository.create(album);
    return await this.favAlbumsRepository.save(favAlbum);
  }

  async createArtist(id: string) {
    const artist = await this.artistsRepository.findOneBy({ id });

    if (!artist) {
      throw new UnprocessableEntityException('Artist not found');
    }

    const favArtist = this.favArtistsRepository.create(artist);
    return await this.favArtistsRepository.save(favArtist);
  }

  async findAll() {
    const favAlbums = await this.favAlbumsRepository.find();
    const favArtists = await this.favArtistsRepository.find();
    const favTracks = await this.favTracksRepository.find();

    return {
      artists: favArtists,
      albums: favAlbums,
      tracks: favTracks,
    };
  }

  async removeTrack(id: string) {
    const isTrackInFavorites = await this.favTracksRepository.findOneBy({ id });

    if (!isTrackInFavorites) {
      throw new NotFoundException('Corresponding track is not favorite');
    }

    return await this.favTracksRepository.delete(id);
  }

  async removeAlbum(id: string) {
    const isAlbumInFavorites = await this.favAlbumsRepository.findOneBy({ id });

    if (!isAlbumInFavorites) {
      throw new NotFoundException('Corresponding album is not favorite');
    }

    return await this.favAlbumsRepository.delete(id);
  }

  async removeArtist(id: string) {
    const isArtistInFavorites = await this.favArtistsRepository.findOneBy({
      id,
    });

    if (!isArtistInFavorites) {
      throw new NotFoundException('Corresponding artist is not favorite');
    }

    return await this.favArtistsRepository.delete(id);
  }
}
