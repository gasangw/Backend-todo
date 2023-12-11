import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TaskModule } from './task/task.module';
import { CategoryController } from './category/category.controller';
import { CategoryModule } from './category/category.module';

@Module({
  controllers: [AppController, CategoryController],
  providers: [AppService],
  imports: [TaskModule, CategoryModule],
})
export class AppModule {}
