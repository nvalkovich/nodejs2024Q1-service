import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity()
export class Artist {
  @PrimaryColumn()
  id: string; // uuid
  @Column()
  name: string;
  @Column()
  grammy: boolean;

  constructor(partial: Partial<Artist>) {
    Object.assign(this, partial);
  }
}
