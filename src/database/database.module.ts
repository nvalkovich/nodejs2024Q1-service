import { Module } from '@nestjs/common';
import { UserEntity } from 'src/users/entities/user.entity';

export interface Artist {
  id: string; // uuid v4
  name: string;
  grammy: boolean;
}

export interface Track {
  id: string; // uuid v4
  login: string;
  password: string;
  version: number; // integer number, increments on update
  createdAt: number; // timestamp of creation
  updatedAt: number; // timestamp of last update
}

export interface Album {
  id: string; // uuid v4
  name: string;
  year: number;
  artistId: string | null; // refers to Artist
}

export interface Favorites {
  artists: string[]; // favorite artists ids
  albums: string[]; // favorite albums ids
  tracks: string[]; // favorite tracks ids
}

@Module({})
export class Database {
  static instance: Database | undefined;
  users: UserEntity[];
  artists: Artist[];
  tracks: Track[];
  albums: Album[];
  favorites: Favorites[];

  constructor() {
    this.users = [];
    this.artists = [];
    this.tracks = [];
    this.albums = [];
    this.favorites = [];
  }

  static getInstance() {
    if (!Database.instance) {
      Database.instance = new Database();
    }

    return Database.instance;
  }

  getAllUsers() {
    return this.users;
  }

  getUserById(userId: string) {
    return this.users.find((user) => user.id === userId);
  }

  createUser(newUser: UserEntity) {
    this.users.push(newUser);
    return newUser;
  }

  deleteUser(userId: string) {
    return (this.users = this.users.filter((user) => user.id !== userId));
  }

  updateUser(updatedUser: UserEntity) {
    const updatedUsers = this.users.map((user) =>
      user.id === updatedUser.id ? updatedUser : user,
    );

    this.users = updatedUsers;

    return updatedUser;
  }
}
