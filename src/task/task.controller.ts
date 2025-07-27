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
import {
  ApiCreatedResponse,
  ApiOkResponse,
} from '@nestjs/swagger/dist/decorators/api-response.decorator';
import { ApiBody } from '@nestjs/swagger/dist/decorators/api-body.decorator';
import { Task } from './entity/task.entity';

@ApiTags('task')
@Controller('task')
export class TaskController {
  constructor(
    private readonly taskService: TaskService,
    private readonly categoryService: CategoryService,
  ) {}

  @Get()
  @ApiOkResponse({
    description: 'The tasks have been successfully returned.',
  })
  getAll(): Promise<Task[]> {
    return this.taskService.getAll();
  }

  @Get(':id')
  @ApiOkResponse({
    description: 'The task has been successfully returned.',
  })
  async getOne(@Param('id') id: string) {
    const task: Task = await this.taskService.getOne(id);
    return task;
  }

  @Post()
  @ApiCreatedResponse({
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
  @ApiOkResponse({
    description: 'The task has been successfully removed.',
  })
  async remove(@Param('id') id: string) {
    return await this.taskService.delete(id);
  }
}
