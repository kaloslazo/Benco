import { ApiProperty } from '@nestjs/swagger';
import { IsDateString, IsOptional, IsString, MaxLength, MinLength } from 'class-validator';

export class BookUploadDto {
  @ApiProperty()
  @IsString()
  @MinLength(4)
  @IsOptional()
  title: string;

  @ApiProperty()
  @IsString()
  @MaxLength(255)
  @IsOptional()
  description: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  author: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  cover: string;
}
