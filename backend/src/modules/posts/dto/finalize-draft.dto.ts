import {
  IsISO8601,
  IsOptional,
  IsString,
  IsUUID,
  MaxLength,
} from 'class-validator';

export class FinalizeDraftDto {
  @IsUUID('4', { message: 'nicheId deve ser um UUID valido' })
  nicheId: string = '';

  @IsISO8601({}, { message: 'scheduledAt deve estar no formato ISO8601' })
  scheduledAt: string = '';

  @IsString({ message: 'title deve ser uma string' })
  @IsOptional()
  @MaxLength(255, { message: 'title muito grande' })
  title?: string;

  @IsString({ message: 'description deve ser uma string' })
  @IsOptional()
  @MaxLength(500, { message: 'description muito grande' })
  description?: string;
}
