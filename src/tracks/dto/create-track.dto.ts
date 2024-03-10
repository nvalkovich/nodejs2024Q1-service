import { IsNotEmpty, IsNumber, IsString, IsUUID } from 'class-validator';

export class CreateTrackDto {
  @IsString()
  @IsNotEmpty()
  name: string;
  artistId: string | null; // refers to Artist
  albumId: string | null; // refers to Album
  @IsNumber()
  @IsNotEmpty()
  duration: number; // integer number
}

export class FindOneParams {
  @IsString()
  @IsNotEmpty()
  @IsUUID()
  id: string;
}
