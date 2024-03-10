import { Module } from '@nestjs/common';
import { TrackEntity } from 'src/tracks/entities/track.entity';
import { UserEntity } from 'src/users/entities/user.entity';

export interface Artist {
  id: string; // uuid v4
  name: string;
  grammy: boolean;
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
  tracks: TrackEntity[];
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

  getAllTracks() {
    return this.tracks;
  }

  getUserById(userId: string) {
    return this.users.find((user) => user.id === userId);
  }

  getTrackById(trackId: string) {
    return this.tracks.find((track) => track.id === trackId);
  }

  createUser(newUser: UserEntity) {
    this.users.push(newUser);
    return newUser;
  }

  createTrack(newTrack: TrackEntity) {
    this.tracks.push(newTrack);
    return newTrack;
  }

  deleteUser(userId: string) {
    return (this.users = this.users.filter((user) => user.id !== userId));
  }

  deleteTrack(trackId: string) {
    return (this.tracks = this.tracks.filter((track) => track.id !== trackId));
  }

  updateUser(updatedUser: UserEntity) {
    const updatedUsers = this.users.map((user) =>
      user.id === updatedUser.id ? updatedUser : user,
    );

    this.users = updatedUsers;

    return updatedUser;
  }

  updateTrack(updatedTrack: TrackEntity) {
    const updatedTracks = this.tracks.map((track) =>
      track.id === updatedTrack.id ? updatedTrack : track,
    );

    this.tracks = updatedTracks;

    return updatedTrack;
  }
}
