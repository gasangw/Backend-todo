export class Task {
  id: string;
  title: string;
  description: string;
  status: TaskStatus.OPEN;
  categoryId: string;
}

export enum TaskStatus {
  OPEN = 'OPEN',
  DONE = 'DONE',
  IN_PROGRESS = 'IN_PROGRESS',
}
