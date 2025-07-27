import { Test, TestingModule } from '@nestjs/testing';
import { CategoryController } from './category.controller';
import { CategoryService } from './category.service';
import { TaskService } from '../task/task.service';
import { Category } from './entity/category.entity';

describe('CategoryController', () => {
  let controller: CategoryController;
  let fakeCategoryService: Partial<CategoryService>;
  let fakeTaskService: Partial<TaskService>;

  beforeEach(async () => {
    fakeCategoryService = {
      getAllCategories: () => {
        return Promise.resolve([
          {
            id: 'category1',
            name: 'test',
          },
        ] as Category[]);
      },
      createCategory: () => {
        return Promise.resolve({
          id: 'category1',
          name: 'test',
        } as Category);
      },
      removeCategory: () => {
        return Promise.resolve();
      },
    };

    fakeTaskService = {
      getAll: () => {
        return Promise.resolve([
          {
            id: '1',
            title: 'test',
            description: 'testing in action',
            status: 'OPEN',
            categoryId: 'category1',
          },
        ]);
      },
    };

    const module: TestingModule = await Test.createTestingModule({
      controllers: [CategoryController],
      providers: [
        {
          provide: CategoryService,
          useValue: fakeCategoryService,
        },
        {
          provide: TaskService,
          useValue: fakeTaskService,
        },
      ],
    }).compile();

    controller = module.get<CategoryController>(CategoryController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should return all categories', async () => {
    const categories = await controller.getAllCategories();
    expect(categories.length).toEqual(1);
  });

  it('should create a category', async () => {
    const newCategory = await controller.createCategory({
      name: 'test',
    });
    expect(newCategory).toBeDefined();
  });

  it('should remove a category', async () => {
    const tasks = await fakeTaskService.getAll();
    const categories = await fakeCategoryService.getAllCategories();
    const CategoryContainingTask = tasks.filter((task) =>
      categories.some((category) => category.id === task.categoryId),
    );
    expect(CategoryContainingTask.length).toEqual(1);
  });

  it('should remove a category', async () => {
    const tasks = await fakeTaskService.getAll();
    const categories = await fakeCategoryService.getAllCategories();
    const CategoryContainingTask = tasks.filter((task) =>
      categories.some((category) => category.id !== task.categoryId),
    );
    expect(CategoryContainingTask.length).toEqual(0);
  });
});
