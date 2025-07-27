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
      create: () => {
        return Promise.resolve({
          id: '1',
          title: 'test',
          description: 'testing in action',
          status: 'OPEN',
          categoryId: 'category1',
        } as Task);
      },
      delete: () => {
        return Promise.resolve();
      },
    };

    fakeCategoryService = {
      getAllCategories: () => {
        return Promise.resolve([
          {
            id: 'category1',
            name: 'test',
          },
        ]);
      },
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

  it('should return an array of tasks', async () => {
    const tasks = await controller.getAll();
    expect(tasks.length).toBeGreaterThan(0);
  });

  it('should return a task with id 1', async () => {
    const task = await controller.getOne('1');
    expect(task.id).toEqual('1');
  });

  it('should remove a task with id 1', async () => {
    const task = await controller.remove('1');
    expect(task).toBeUndefined();
  });

  it('it should create a task', async () => {
    const allCategories = await fakeCategoryService.getAllCategories();
    const categoryId = allCategories.slice(-1)[0].id;
    const newBody = {
      title: 'test',
      description: 'testing in action',
      categoryId,
    };
    const newTask = await controller.create(newBody);
    expect(newTask).toBeDefined();
  });
});
