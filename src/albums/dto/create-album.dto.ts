import {
  IsNotEmpty,
  IsNumber,
  IsString,
  IsUUID,
  ValidateIf,
} from 'class-validator';

export class CreateAlbumDto {
  @IsString()
  @IsNotEmpty()
  name: string;
  @IsNumber()
  @IsNotEmpty()
  year: number;
  @IsString()
  @ValidateIf((_, value) => value !== null)
  artistId: string | null; // refers to Artist
}

export class FindOneParams {
  @IsString()
  @IsNotEmpty()
  @IsUUID()
  id: string;
}
