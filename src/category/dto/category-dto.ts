import { IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger/dist/decorators';

export class CategoryDto {
  @ApiProperty({
    example: 'NestJS Framework',
    required: true,
  })
  @IsString()
  name: string;
}
