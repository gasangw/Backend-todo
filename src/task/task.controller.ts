import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { TaskService } from './task.service';
import { TaskDto } from './dto/task-dto';

@Controller('task')
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  @Get()
  getAll() {
    return this.taskService.getAll();
  }

  @Get()
  async getOne(@Param('id') id: string) {
    const task = await this.taskService.getOne(id);
    return task;
  }

  @Post()
  create(@Body() body: TaskDto) {
    console.log(body);
    return this.taskService.create(body);
  }

  @Delete()
  remove(@Param('id') id: string) {
    return this.taskService.delete(id);
  }
}
