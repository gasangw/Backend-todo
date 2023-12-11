import { Module } from '@nestjs/common';
import { TaskController } from './task.controller';
import { TaskService } from './task.service';
import { TaskRepository } from './task.repository';
import { Config, JsonDB } from 'node-json-db';

@Module({
  controllers: [TaskController],
  providers: [
    TaskService,
    TaskRepository,
    {
      provide: 'DATABASE',
      useValue: new JsonDB(new Config('myOwnDatabase', true, false, '/')),
    },
  ],
})
export class TaskModule {}
