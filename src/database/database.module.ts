import { Module } from '@nestjs/common';
import { TrackEntity } from 'src/tracks/entities/track.entity';
import { UserEntity } from 'src/users/entities/user.entity';
import { ArtistEntity } from 'src/artists/entities/artist.entity';
import { AlbumEntity } from 'src/albums/entities/album.entity';

export interface Favorites {
  artists: string[]; // favorite artists ids
  albums: string[]; // favorite albums ids
  tracks: string[]; // favorite tracks ids
}

@Module({})
export class Database {
  static instance: Database | undefined;
  users: UserEntity[];
  artists: ArtistEntity[];
  tracks: TrackEntity[];
  albums: AlbumEntity[];
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

  getAllArtists() {
    return this.artists;
  }

  getAllAlbums() {
    return this.albums;
  }

  getUserById(userId: string) {
    return this.users.find((user) => user.id === userId);
  }

  getTrackById(trackId: string) {
    return this.tracks.find((track) => track.id === trackId);
  }

  getArtistById(artistId: string) {
    return this.artists.find((artist) => artist.id === artistId);
  }

  getAlbumById(albumId: string) {
    return this.albums.find((album) => album.id === albumId);
  }

  createUser(newUser: UserEntity) {
    this.users.push(newUser);
    return newUser;
  }

  createTrack(newTrack: TrackEntity) {
    this.tracks.push(newTrack);
    return newTrack;
  }

  createArtist(newArtist: ArtistEntity) {
    this.artists.push(newArtist);
    return newArtist;
  }

  createAlbum(newAlbum: AlbumEntity) {
    this.albums.push(newAlbum);
    return newAlbum;
  }

  deleteUser(userId: string) {
    return (this.users = this.users.filter((user) => user.id !== userId));
  }

  deleteTrack(trackId: string) {
    return (this.tracks = this.tracks.filter((track) => track.id !== trackId));
  }

  deleteArtist(artistId: string) {
    this.albums = this.albums.map((album) =>
      Object.assign(album, {
        artistId: album.artistId === artistId ? null : artistId,
      }),
    );

    this.tracks = this.tracks.map((track) =>
      Object.assign(track, {
        artistId: track.artistId === artistId ? null : artistId,
      }),
    );

    return (this.artists = this.artists.filter(
      (artist) => artist.id !== artistId,
    ));
  }

  deleteAlbum(albumId: string) {
    this.tracks = this.tracks.map((track) =>
      Object.assign(track, {
        albumId: track.albumId === albumId ? null : track,
      }),
    );

    return (this.albums = this.albums.filter((album) => album.id !== albumId));
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

  updateArtist(updatedArtist: ArtistEntity) {
    const updatedArtists = this.artists.map((artist) =>
      artist.id === updatedArtist.id ? updatedArtist : artist,
    );

    this.artists = updatedArtists;

    return updatedArtist;
  }

  updateAlbum(updatedAlbum: AlbumEntity) {
    const updatedAlbums = this.albums.map((album) =>
      album.id === updatedAlbum.id ? updatedAlbum : album,
    );

    this.albums = updatedAlbums;

    return updatedAlbum;
  }
}
