import { TodoDto } from './todo.dto';
import { Todo } from '../todo.model';

export class TodosDto {
  todos: TodoDto[];

  constructor(todos: Partial<Todo>[]) {
    Object.assign(this, { todos: todos.map((todo) => new TodoDto(todo)) });
  }
}
