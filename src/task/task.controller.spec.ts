import { Test, TestingModule } from '@nestjs/testing';
import { TaskController } from './task.controller';
import { TaskService } from './task.service';
import { CategoryService } from '../category/category.service';
import { Task } from '../task/entity/task.entity';

describe('TaskController', () => {
  let controller: TaskController;
  let fakeTaskService: Partial<TaskService>;
  let fakeCategoryService: Partial<CategoryService>;

  beforeEach(async () => {
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
        ] as Task[]);
      },
      getOne: (id: string) => {
        return Promise.resolve({
          id,
          title: 'test',
          description: 'testing in action',
          status: 'OPEN',
          categoryId: 'category1',
        } as Task);
      },
      // create: () => {},
      // delete: (id: string) => {
      //   return Promise.resolve({ id });
      // },
    };
    fakeCategoryService = {
      // create: () => {},
    };

    const module: TestingModule = await Test.createTestingModule({
      controllers: [TaskController],
      providers: [
        {
          provide: TaskService,
          useValue: fakeTaskService,
        },
        {
          provide: CategoryService,
          useValue: fakeCategoryService,
        },
      ],
    }).compile();

    controller = module.get<TaskController>(TaskController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
