import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { JsonDB } from 'node-json-db';
import { v4 as uuidv4 } from 'uuid';
import { Task, TaskStatus } from './entity/task.entity';

@Injectable()
export class TaskRepository {
  constructor(@Inject('DATABASE') private db: JsonDB) {
    if (!this.db.exists('/task')) {
      this.db.push('/task', []);
    }
  }

  async getAll() {
    const tasks = await this.db.getData('/task');
    return tasks;
  }

  async getOne(id: string) {
    try {
      const tasks = await this.db.getData('/task');
      const task = tasks.find((task: Task) => task.id === id);
      if (!task) throw new NotFoundException(`Did not find task with ${id}`);
      return task;
    } catch (err) {
      throw new NotFoundException(`Did not find task with ${id}`);
    }
  }

  async create(task: Task) {
    const EachTask = await this.db.push('/task[]', {
      id: uuidv4(),
      status: TaskStatus.OPEN,
      ...task,
      categoryId: task.categoryId,
    });
    return EachTask;
  }

  async remove(id: string) {
    const tasks = await this.db.getData('/task');
    const updatedTasks = tasks.filter((task: Task) => task.id !== id);
    return await this.db.push('/task', updatedTasks);
  }
}
