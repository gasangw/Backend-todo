export class Task {
  id: number;
  title: string;
  description: string;
  status: TaskStatus.OPEN;
  categoryId: number;
}

enum TaskStatus {
  OPEN = 'OPEN',
  DONE = 'DONE',
  IN_PROGRESS = 'IN_PROGRESS',
}
