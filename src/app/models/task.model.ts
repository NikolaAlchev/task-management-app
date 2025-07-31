export class Task {
  constructor(
    public id: string,
    public title: string,
    public description: string,
    public category: string,
    public dueDate: Date,
    public priority: 'Low' | 'Medium' | 'High',
    public completed: boolean = false
  ) {}
}
