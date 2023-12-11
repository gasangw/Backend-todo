import { Injectable } from '@nestjs/common';
import { CategoryRepository } from './category.repository';

@Injectable()
export class CategoryService {
  constructor(private readonly categoryRepository: CategoryRepository) {}

  getAllCategories() {
    return this.categoryRepository.getAllCategories();
  }

  createCategory(body) {
    return this.categoryRepository.createCategory(body);
  }
}
