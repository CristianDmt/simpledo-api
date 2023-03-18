import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
  HttpCode, HttpStatus, Query
} from "@nestjs/common";
import { TodoService } from './todo.service';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { TodosDto } from './dto/todos.dto';
import { TodoPipe } from './todo.pipe';
import { Todo } from './todo.model';
import { TodoDto } from './dto/todo.dto';

@Controller('todos')
export class TodoController {
  constructor(private readonly todoService: TodoService) {}

  @Post()
  async create(@Body() createTodoDto: CreateTodoDto): Promise<TodoDto> {
    return new TodoDto(await this.todoService.create(createTodoDto));
  }

  @Patch(':id')
  async updateTodo(
    @Param('id', ParseIntPipe, TodoPipe) todo: Todo,
    @Body() updateTodoDto: UpdateTodoDto,
  ) {
    return new TodoDto(await this.todoService.update(todo, updateTodoDto));
  }

  @Patch(':id/pending')
  async markPendingTodo(@Param('id', ParseIntPipe, TodoPipe) todo: Todo) {
    return new TodoDto(
      await this.todoService.update(todo, { completed: false }),
    );
  }

  @Patch(':id/complete')
  async markCompletedTodo(@Param('id', ParseIntPipe, TodoPipe) todo: Todo) {
    return new TodoDto(
      await this.todoService.update(todo, { completed: true }),
    );
  }

  @Get()
  async listTodos(@Query('completed') isCompleted?: number): Promise<TodosDto> {
    return new TodosDto(await this.todoService.findAll(isCompleted));
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async deleteTodo(
    @Param('id', ParseIntPipe, TodoPipe) todo: Todo,
  ): Promise<object> {
    await this.todoService.remove(todo);
    return {};
  }
}
