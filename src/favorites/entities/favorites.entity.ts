import { Album } from 'src/albums/entities/album.entity';
import { Artist } from 'src/artists/entities/artist.entity';
import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class FavTracks {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column({ nullable: true })
  @OneToOne(() => Artist, { onDelete: 'SET NULL' })
  artistId: string | null;

  @Column({ nullable: true })
  @OneToOne(() => Album, { onDelete: 'SET NULL' })
  albumId: string | null;

  @Column()
  duration: number;
}

@Entity()
export class FavAlbums {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column({ nullable: true })
  year: number;

  @Column({ nullable: true })
  @OneToOne(() => Artist, { onDelete: 'SET NULL' })
  artistId: string | null;
}

@Entity()
export class FavArtists {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  grammy: boolean;
}
