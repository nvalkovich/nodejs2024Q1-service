import { Module } from '@nestjs/common';
import { FavoritesService } from './favorites.service';
import { FavoritesController } from './favorites.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FavAlbums, FavArtists, FavTracks } from './entities/favorites.entity';
import { Album } from 'src/albums/entities/album.entity';
import { Track } from 'src/tracks/entities/track.entity';
import { Artist } from 'src/artists/entities/artist.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([FavAlbums]),
    TypeOrmModule.forFeature([FavTracks]),
    TypeOrmModule.forFeature([FavArtists]),
    TypeOrmModule.forFeature([Album]),
    TypeOrmModule.forFeature([Track]),
    TypeOrmModule.forFeature([Artist]),
  ],
  controllers: [FavoritesController],
  providers: [FavoritesService],
})
export class FavoritesModule {}
