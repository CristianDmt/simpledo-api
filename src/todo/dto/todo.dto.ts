import { Exclude, Expose } from 'class-transformer';
import { Todo } from '../todo.model';
@Exclude()
export class TodoDto {
  @Expose()
  id: number;

  @Expose()
  title: string;

  @Expose()
  completed: boolean;

  constructor(todo: Partial<Todo>) {
    Object.assign(this, todo.get({ plain: true }));
  }
}
