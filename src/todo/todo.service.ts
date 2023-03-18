import { Injectable } from '@nestjs/common';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { Todo } from './todo.model';
import { InjectModel } from '@nestjs/sequelize';

@Injectable()
export class TodoService {
  constructor(@InjectModel(Todo) private todoModel: typeof Todo) {}

  async create(createTodoDto: CreateTodoDto) {
    return await this.todoModel.create(createTodoDto);
  }

  async findAll(filterCompleted?: number): Promise<Todo[]> {
    return await this.todoModel.findAll(filterCompleted !== undefined ? {
      where: {
        completed: filterCompleted
      }
    } : {});
  }

  async update(
    todo: Todo,
    updateTodoDto: UpdateTodoDto | { completed: boolean },
  ): Promise<Todo> {
    todo.completed = updateTodoDto.completed;

    return await todo.save();
  }

  async remove(todo: Todo): Promise<void> {
    await todo.destroy();
  }
}
