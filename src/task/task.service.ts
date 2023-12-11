import { Injectable } from '@nestjs/common';
import { TaskRepository } from './task.repository';

@Injectable()
export class TaskService {
  constructor(private readonly taskRepository: TaskRepository) {}

  getAll() {
    return this.taskRepository.getAll();
  }

  getOne(id: string) {
    return this.taskRepository.getOne(id);
  }

  create(body) {
    this.taskRepository.create(body);
  }

  delete(id: string) {
    this.taskRepository.remove(id);
  }
}
