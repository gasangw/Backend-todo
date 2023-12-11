import { IsString, IsNumber } from 'class-validator';

export class TaskDto {
  @IsString()
  title: string;

  @IsString()
  description: string;

  @IsNumber()
  categoryId: number;
}
