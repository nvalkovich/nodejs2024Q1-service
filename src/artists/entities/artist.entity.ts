import { Album } from 'src/albums/entities/album.entity';
import { Column, Entity, OneToMany, PrimaryColumn } from 'typeorm';

@Entity()
export class Artist {
  @PrimaryColumn()
  id: string; // uuid
  @Column()
  name: string;
  @Column()
  grammy: boolean;

  @OneToMany(() => Album, (album) => album.artistId)
  albums: Album;

  constructor(partial: Partial<Artist>) {
    Object.assign(this, partial);
  }
}
