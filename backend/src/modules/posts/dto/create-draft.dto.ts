import { IsOptional, IsString, MaxLength } from 'class-validator';

export class CreateDraftDto {
  @IsString({ message: 'title deve ser uma string' })
  @IsOptional()
  @MaxLength(255, { message: 'title muito grande' })
  title?: string;
}
