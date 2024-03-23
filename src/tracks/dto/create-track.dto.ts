import {
  IsNotEmpty,
  IsNumber,
  IsString,
  IsUUID,
  ValidateIf,
} from 'class-validator';

export class CreateTrackDto {
  @IsString()
  @IsNotEmpty()
  name: string;
  @IsString()
  @ValidateIf((_, value) => value !== null)
  artistId: string | null; // refers to Artist
  @IsString()
  @ValidateIf((_, value) => value !== null)
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
