import { Exclude } from 'class-transformer';
import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  @Column()
  login: string;
  @Column()
  version: number; // integer number, increments on update
  @CreateDateColumn()
  createdAt: number; // timestamp of creation
  @UpdateDateColumn()
  // @Column()
  updatedAt: number; // timestamp of last update
  @Column({ nullable: true })
  refreshToken: string;

  @Exclude()
  @Column()
  password: string;

  constructor(partial: Partial<User>) {
    Object.assign(this, partial);
  }
}
