import {
  PipeTransform,
  Injectable,
  ArgumentMetadata,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Todo } from './todo.model';

@Injectable()
export class TodoPipe implements PipeTransform<number, Promise<Todo>> {
  constructor(@InjectModel(Todo) private readonly TodoModel: typeof Todo) {}

  async transform(value: number, metadata: ArgumentMetadata): Promise<Todo> {
    const Todo = await this.TodoModel.findOne({ where: { id: value } });

    if (!Todo) {
      throw new NotFoundException(`Todo '${value}' not found`);
    }

    return Todo;
  }
}