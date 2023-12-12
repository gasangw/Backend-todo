import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TaskModule } from './task/task.module';
import { Config, JsonDB } from 'node-json-db';
import { CategoryModule } from './category/category.module';

@Module({
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: 'DATABASE',
      useValue: new JsonDB(new Config('myOwnDatabase', true, false, '/')),
    },
  ],
  imports: [TaskModule, CategoryModule],
})
export class AppModule {}
