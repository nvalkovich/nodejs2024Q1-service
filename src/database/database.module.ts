import { Module } from '@nestjs/common';
import { TrackEntity } from 'src/tracks/entities/track.entity';
import { UserEntity } from 'src/users/entities/user.entity';
import { ArtistEntity } from 'src/artists/entities/artist.entity';
import { AlbumEntity } from 'src/albums/entities/album.entity';
import { FavoritesEntity } from 'src/favorites/entities/favorites.entity';

@Module({})
export class Database {
  static instance: Database | undefined;
  users: UserEntity[];
  artists: ArtistEntity[];
  tracks: TrackEntity[];
  albums: AlbumEntity[];
  favorites: FavoritesEntity;

  constructor() {
    this.users = [];
    this.artists = [];
    this.tracks = [];
    this.albums = [];
    this.favorites = {
      artists: [],
      albums: [],
      tracks: [],
    };
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

  getAllFavorites() {
    const artists = this.favorites.artists.map((artistId) => {
      const artist = this.getArtistById(artistId);
      if (artist) {
        return artist;
      }
    });

    const albums = this.favorites.albums.map((albumId) => {
      const album = this.getAlbumById(albumId);
      if (album) {
        return album;
      }
    });

    const tracks = this.favorites.tracks.map((trackId) => {
      const track = this.getTrackById(trackId);
      if (track) {
        return track;
      }
    });

    const favoritesResponse = {
      artists,
      albums,
      tracks,
    };

    return favoritesResponse;
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
        albumId: track.albumId === albumId ? null : albumId,
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

  addTrackToFavorites(trackId: string) {
    return this.favorites.tracks.push(trackId);
  }

  addAlbumToFavorites(albumId: string) {
    return this.favorites.albums.push(albumId);
  }

  addArtistToFavorites(artistId: string) {
    return this.favorites.artists.push(artistId);
  }

  removeTrackFromFavorites(trackId: string) {
    this.favorites = Object.assign(this.favorites, {
      tracks: this.favorites.tracks.filter((id) => id != trackId),
    });
    return this.favorites;
  }

  removeAlbumFromFavorites(albumId: string) {
    this.favorites = Object.assign(this.favorites, {
      albums: this.favorites.albums.filter((id) => id != albumId),
    });
    return this.favorites;
  }

  removeArtistFromFavorites(artistId: string) {
    this.favorites = Object.assign(this.favorites, {
      artists: this.favorites.artists.filter((id) => id != artistId),
    });

    return this.favorites;
  }

  isTrackInFavorites(trackId: string) {
    return this.favorites.tracks.includes(trackId);
  }

  isAlbumInFavorites(albumId: string) {
    return this.favorites.albums.includes(albumId);
  }

  isArtistInFavorites(artistId: string) {
    return this.favorites.artists.includes(artistId);
  }
}
