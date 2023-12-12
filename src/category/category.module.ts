import { Module, forwardRef } from '@nestjs/common';
import { CategoryController } from './category.controller';
import { CategoryService } from './category.service';
import { CategoryRepository } from './category.repository';
import { Config, JsonDB } from 'node-json-db';
import { TaskModule } from 'src/task/task.module';

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
  imports: [forwardRef(() => TaskModule)],
})
export class CategoryModule {}
