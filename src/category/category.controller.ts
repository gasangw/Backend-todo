import {
  Body,
  ConflictException,
  Controller,
  Delete,
  Get,
  Param,
  Post,
} from '@nestjs/common';
import { CategoryService } from './category.service';
import { CategoryDto } from './dto/category-dto';
import { TaskService } from '../task/task.service';
import { Task } from '../task/entity/task.entity';
import { ApiTags } from '@nestjs/swagger/dist';

@ApiTags('category')
@Controller('category')
export class CategoryController {
  constructor(
    private readonly categoryService: CategoryService,
    private readonly taskService: TaskService,
  ) {}

  @Get()
  async getAllCategories() {
    return await this.categoryService.getAllCategories();
  }

  @Post()
  createCategory(@Body() body: CategoryDto) {
    return this.categoryService.createCategory(body);
  }

  @Delete(':id')
  async removeCategory(@Param('id') id: string) {
    try {
      const allTasks = await this.taskService.getAll();
      const TaskContainingCategory = allTasks.filter(
        (task: Task) => task.categoryId === id,
      );
      if (TaskContainingCategory) {
        throw new ConflictException('This category has tasks');
      }
      return this.categoryService.removeCategory(id);
    } catch (error) {
      throw new ConflictException(`This error is due to ${error}`);
    }
  }
}
