import { Injectable } from '@nestjs/common';
import { TaskRepository } from './task.repository';

@Injectable()
export class TaskService {
  constructor(private readonly taskRepository: TaskRepository) {}

  getAll() {
    return this.taskRepository.getAll();
  }

  getOne(id: number) {
    return this.taskRepository.getOne(id);
  }

  create(task: any) {
    console.log(task);
    return this.taskRepository.create(task);
  }

  delete(id: number) {
    return this.taskRepository.remove(id);
  }
}
