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
import { ApiTags } from '@nestjs/swagger/dist';
import { ApiResponse } from '@nestjs/swagger/dist/decorators/api-response.decorator';
import { ApiBody } from '@nestjs/swagger/dist/decorators/api-body.decorator';

@ApiTags('task')
@Controller('task')
export class TaskController {
  constructor(
    private readonly taskService: TaskService,
    private readonly categoryService: CategoryService,
  ) {}

  @Get()
  @ApiResponse({
    status: 201,
    description: 'The tasks have been successfully returned.',
  })
  getAll() {
    return this.taskService.getAll();
  }

  @Get(':id')
  @ApiResponse({
    status: 201,
    description: 'The task has been successfully returned.',
  })
  async getOne(@Param('id') id: string) {
    const task = await this.taskService.getOne(id);
    return task;
  }

  @Post()
  @ApiResponse({
    status: 201,
    description: 'The task has been successfully created.',
  })
  @ApiBody({ type: TaskDto, description: 'structure of the user object' })
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
  @ApiResponse({
    status: 201,
    description: 'The task has been successfully deleted.',
  })
  async remove(@Param('id') id: string) {
    return await this.taskService.delete(id);
  }
}
