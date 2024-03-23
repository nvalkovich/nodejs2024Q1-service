import { IsBoolean, IsNotEmpty, IsString, IsUUID } from 'class-validator';

export class CreateArtistDto {
  @IsString()
  @IsNotEmpty()
  name: string;
  @IsBoolean()
  @IsNotEmpty()
  grammy: boolean;
}

export class FindOneParams {
  @IsString()
  @IsNotEmpty()
  @IsUUID()
  id: string;
}
