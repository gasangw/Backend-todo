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
import { ApiBody } from '@nestjs/swagger/dist/decorators/api-body.decorator';
import {
  ApiCreatedResponse,
  ApiOkResponse,
  ApiConflictResponse,
} from '@nestjs/swagger/dist/decorators/api-response.decorator';

@ApiTags('category')
@Controller('category')
export class CategoryController {
  constructor(
    private readonly categoryService: CategoryService,
    private readonly taskService: TaskService,
  ) {}

  @Get()
  @ApiOkResponse({
    description: 'The categories have been successfully returned.',
  })
  async getAllCategories() {
    return await this.categoryService.getAllCategories();
  }

  @Post()
  @ApiCreatedResponse({
    description: 'The category has been successfully created.',
  })
  @ApiBody({ type: CategoryDto, description: 'structure of the user object' })
  createCategory(@Body() body: CategoryDto) {
    return this.categoryService.createCategory(body);
  }

  @Delete(':id')
  @ApiOkResponse({
    description: 'The category has been successfully removed.',
  })
  @ApiConflictResponse({
    description: 'Conflict the category has tasks',
  })
  async removeCategory(@Param('id') id: string) {
    try {
      const allTasks = await this.taskService.getAll();
      const TaskContainingCategory = allTasks.filter(
        (task: Task) => task.categoryId === id,
      );
      if (TaskContainingCategory.length > 0) {
        throw new ConflictException('This category has tasks');
      }
      return this.categoryService.removeCategory(id);
    } catch (error) {
      throw new ConflictException(`This error is due to ${error}`);
    }
  }
}
