import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { CategoryService } from './category.service';
import { CategoryDto } from './dto/category-dto';

@Controller('category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Get()
  async getAllCategories() {
    return await this.categoryService.getAllCategories();
  }

  @Get(':id')
  async getOneCategory(@Param('id') id: string) {
    const category = await this.categoryService.getOneCategory(id);
    return category;
  }

  @Post()
  createCategory(@Body() body: CategoryDto) {
    return this.categoryService.createCategory(body);
  }
}
