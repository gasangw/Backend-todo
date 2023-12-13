import { Test, TestingModule } from '@nestjs/testing';
import { TaskService } from './task.service';
import { TaskRepository } from './task.repository';

describe('TaskService', () => {
  let service: TaskService;
  let fakeTaskRepository: Partial<TaskRepository>;

  beforeEach(async () => {
    fakeTaskRepository = {
      getOne: () => {
        return Promise.resolve({
          id: '1',
          title: 'test',
          description: 'testing in action starts here',
          status: 'OPEN',
          categoryId: 'category1',
        });
      },

      getAll: () => {
        return Promise.resolve([]);
      },

      remove: () => {
        return Promise.resolve();
      },

      create: () => {
        return Promise.resolve();
      },
    };
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TaskService,
        {
          provide: TaskRepository,
          useValue: fakeTaskRepository,
        },
      ],
    }).compile();

    service = module.get<TaskService>(TaskService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should return an array of tasks', async () => {
    const tasks = await service.getAll();
    expect(tasks).toBeInstanceOf(Array);
  });

  it('should return a task', async () => {
    const result = await service.getOne('1');
    expect(result).toBeDefined();
  });

  it('it should remove a task', async () => {
    const taskRemoved = await service.delete('1');
    expect(taskRemoved).toBeUndefined();
  });

  it('should create a task', async () => {
    const task = await service.create({
      title: 'test',
      description: 'testing in action',
      categoryId: 'category1',
    });
    expect(task).toBeUndefined();
  });
});
