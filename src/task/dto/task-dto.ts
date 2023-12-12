import { IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger/dist/decorators';

export class TaskDto {
  @ApiProperty({
    example: 'Understanding NestJS',
    required: true,
  })
  @IsString()
  title: string;

  @ApiProperty({
    example:
      'I have to understand the fundamentals of NestJS to master it properly',
    required: true,
  })
  @IsString()
  description: string;
}
