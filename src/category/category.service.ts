import { Injectable } from '@nestjs/common';
import { CategoryRepository } from './category.repository';

@Injectable()
export class CategoryService {
  constructor(private readonly categoryRepository: CategoryRepository) {}

  getAllCategories() {
    return this.categoryRepository.getAllCategories();
  }

  getOneCategory(id: string) {
    return this.categoryRepository.findOneCategory(id);
  }

  createCategory(body) {
    this.categoryRepository.createCategory(body);
  }
}
