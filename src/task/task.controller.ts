import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Post,
} from '@nestjs/common';
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
  async create(@Body() body: TaskDto) {
    const categories = await this.categoryService.getAllCategories();
    if (categories.length === 0) {
      throw new NotFoundException('No categories found');
    }
    const categoryId: string = categories.slice(-1)[0].id;
    const newBody = { ...body, categoryId };
    return this.taskService.create(newBody);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return await this.taskService.delete(id);
  }
}
