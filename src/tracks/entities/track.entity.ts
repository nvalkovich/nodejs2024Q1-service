import { Album } from 'src/albums/entities/album.entity';
import { Artist } from 'src/artists/entities/artist.entity';
import { Column, Entity, ManyToOne, PrimaryColumn } from 'typeorm';

@Entity()
export class Track {
  @PrimaryColumn()
  id: string; // uuid v4
  @Column()
  name: string;
  @Column({ nullable: true })
  artistId: string | null; // refers to Artist
  @Column({ nullable: true })
  albumId: string | null;

  @Column()
  duration: number; // integer number
  @ManyToOne(() => Artist, { onDelete: 'SET NULL' })
  artist: Artist;

  @ManyToOne(() => Album, { onDelete: 'SET NULL' })
  album: Album;

  constructor(partial: Partial<Track>) {
    Object.assign(this, partial);
  }
}
