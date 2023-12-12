import { Test, TestingModule } from '@nestjs/testing';
import { CategoryService } from './category.service';
import { CategoryRepository } from './category.repository';
import { Category } from './entity/category.entity';

describe('CategoryService', () => {
  let service: CategoryService;
  let fakeCategoryRepository: Partial<CategoryRepository>;

  beforeEach(async () => {
    fakeCategoryRepository = {
      getAllCategories: () => {
        return Promise.resolve([
          {
            id: 'category1',
            name: 'test',
          },
        ]);
      },

      createCategory: () => {
        return Promise.resolve();
      },

      removeCategory: () => {
        return Promise.resolve();
      },
    };
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CategoryService,
        {
          provide: CategoryRepository,
          useValue: fakeCategoryRepository,
        },
      ],
    }).compile();

    service = module.get<CategoryService>(CategoryService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should return an array of categories', async () => {
    const result = await service.getAllCategories();
    expect(result).toBeInstanceOf(Array);
  });

  it('should create a category', () => {
    const category = service.createCategory({
      name: 'test',
    });
    expect(category).toBeUndefined();
  });

  it('should remove a category', async () => {
    const category = await service.removeCategory('1');
    expect(category).toBeUndefined();
  });
});
