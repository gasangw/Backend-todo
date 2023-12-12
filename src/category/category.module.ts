import { Module } from '@nestjs/common';
import { CategoryController } from './category.controller';
import { CategoryService } from './category.service';
import { CategoryRepository } from './category.repository';
import { Config, JsonDB } from 'node-json-db';

@Module({
  controllers: [CategoryController],
  providers: [
    CategoryService,
    CategoryRepository,
    {
      provide: 'DATABASE',
      useValue: new JsonDB(new Config('myOwnDatabase', true, false, '/')),
    },
  ],
  exports: [CategoryService, CategoryRepository],
})
export class CategoryModule {}
