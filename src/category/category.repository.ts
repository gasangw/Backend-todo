import { Injectable } from '@nestjs/common';
import { Category } from './entity/category.entity';

@Injectable()
export class CategoryRepository {
  Category: Category[] = [
    {
      id: 1,
      name: 'Category 1',
    },
  ];
  getAllCategories() {
    return this.Category;
  }

  createCategory(category: Category) {
    return this.Category.push(category);
  }
}
