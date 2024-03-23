export class FavoritesEntity {
  artists: string[]; // favorite artists ids
  albums: string[]; // favorite albums ids
  tracks: string[]; // favorite tracks ids

  constructor(partial: Partial<FavoritesEntity>) {
    Object.assign(this, partial);
  }
}
