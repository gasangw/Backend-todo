import { Injectable } from '@nestjs/common';
import { CategoryRepository } from './category.repository';

@Injectable()
export class CategoryService {
  constructor(private readonly categoryRepository: CategoryRepository) {}

  getAllCategories() {
    return this.categoryRepository.getAllCategories();
  }

  createCategory(body) {
    this.categoryRepository.createCategory(body);
  }

  removeCategory(id: string) {
    return this.categoryRepository.removeCategory(id);
  }
}
