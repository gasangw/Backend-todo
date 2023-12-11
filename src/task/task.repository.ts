import { Injectable } from '@nestjs/common';
import { Task, TaskStatus } from './entity/task.entity';

@Injectable()
export class TaskRepository {
  storage: Task[] = [
    {
      id: 1,
      title: 'Task 1',
      description: 'Description 1',
      status: TaskStatus.OPEN,
      categoryId: 1,
    },
  ];
  getAll() {
    return this.storage;
  }

  getOne(id: number) {
    return this.storage.find((task) => task.id === id);
  }

  create(task: Task) {
    return this.storage.push(task);
  }

  delete(id: number) {
    return this.storage.filter((task) => task.id !== id);
  }
}
