import { Inject, Injectable } from '@nestjs/common';
import { Category } from './entity/category.entity';
import { JsonDB } from 'node-json-db';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class CategoryRepository {
  constructor(@Inject('DATABASE') private db: JsonDB) {}

  async getAllCategories() {
    const categories = await this.db.getData('/category');
    return categories;
  }

  async createCategory(category: Category) {
    const newCategory = await this.db.push('/category[]', {
      id: uuidv4(),
      ...category,
    });
    return newCategory;
  }

  async removeCategory(id: string) {
    const categories = await this.db.getData('/category');
    const upatedCategories = categories.filter(
      (category: Category) => category.id !== id,
    );
    return await this.db.push('/category', upatedCategories);
  }
}
