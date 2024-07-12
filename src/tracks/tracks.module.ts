import { Module } from '@nestjs/common';
import { TracksService } from './tracks.service';
import { TracksController } from './tracks.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Track } from './entities/track.entity';
import { FavTracks } from 'src/favorites/entities/favorites.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Track]),
    TypeOrmModule.forFeature([FavTracks]),
  ],
  controllers: [TracksController],
  providers: [TracksService],
})
export class TracksModule {}
