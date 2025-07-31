export class Task {
  constructor(
    public id: number,
    public title: string,
    public description: string,
    public category: string,
    public dueDate: Date,
    public priority: 'low' | 'medium' | 'high',
    public completed: boolean = false
  ) {}
}
