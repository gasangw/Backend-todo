import { Injectable, NotFoundException } from '@nestjs/common';
import { JsonDB, Config } from 'node-json-db';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class TaskRepository {
  private db: JsonDB;
  constructor() {
    this.db = new JsonDB(new Config('myOwnDatabase', true, false, '/'));
    if (!this.db.exists('/task')) {
      this.db.push('/task', []);
    }
  }

  async getAll() {
    const tasks = await this.db.getData('/task');
    return tasks;
  }

  async getOne(id: string) {
    const task = await this.db.getData(`/task[${id}]`);
    if (!task) {
      throw new NotFoundException(`Did not find task with ${id}`);
    }
    return task;
  }

  async create(task: any) {
    const EachTask = await this.db.push('/task[]', {
      id: uuidv4(),
      status: 'OPEN',
      ...task,
    });
    return EachTask;
  }

  async remove(id: number) {
    await this.db.delete(`/task[${id}]`);
  }
}
