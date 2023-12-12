import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { TaskService } from './task.service';
import { TaskDto } from './dto/task-dto';
import { CategoryService } from '../category/category.service';

@Controller('task')
export class TaskController {
  constructor(
    private readonly taskService: TaskService,
    private readonly categoryService: CategoryService,
  ) {}

  @Get()
  getAll() {
    return this.taskService.getAll();
  }

  @Get(':id')
  async getOne(@Param('id') id: string) {
    const task = await this.taskService.getOne(id);
    return task;
  }

  @Post()
  create(@Body() body: TaskDto) {
    return this.taskService.create(body);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return await this.taskService.delete(id);
  }
}
