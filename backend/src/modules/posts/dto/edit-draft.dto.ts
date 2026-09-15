import { VideoFormat } from '@prisma/client';
import {
  IsEnum,
  IsNumber,
  IsOptional,
  IsString,
  Min,
  MaxLength,
} from 'class-validator';

export class EditDraftDto {
  @IsString({ message: 'title deve ser uma string' })
  @IsOptional()
  @MaxLength(255, { message: 'title muito grande' })
  title?: string;

  @IsString({ message: 'description deve ser uma string' })
  @IsOptional()
  @MaxLength(500, { message: 'description muito grande' })
  description?: string;

  @IsEnum(VideoFormat, { message: 'format deve ser SHORT ou STANDARD' })
  @IsOptional()
  format?: VideoFormat;

  @IsNumber({}, { message: 'trimStart deve ser um numero (segundos)' })
  @Min(0, { message: 'trimStart nao pode ser negativo' })
  @IsOptional()
  trimStart?: number;

  @IsNumber({}, { message: 'trimEnd deve ser um numero (segundos)' })
  @Min(0, { message: 'trimEnd nao pode ser negativo' })
  @IsOptional()
  trimEnd?: number;
}
