import { Injectable, NotFoundException } from '@nestjs/common';
import { JsonDB, Config } from 'node-json-db';

@Injectable()
export class TaskRepository {
  private db: JsonDB;
  constructor() {
    this.db = new JsonDB(new Config('myOwnDatabase', true, false, '/'));
  }

  async getAll() {
    const tasks = await this.db.getData('/tasks');
    return tasks;
  }

  async getOne(id: number) {
    const task = await this.db.getData(`/tasks[${id}]`);
    if (!task) {
      throw new NotFoundException(`Did not find task with ${id}`);
    }
    return task;
  }

  async remove(id: number) {
    await this.db.delete(`/tasks[${id}]`);
  }
}
