import { MiddlewareConsumer, Module } from '@nestjs/common';
import { TodoService } from './todo.service';
import { TodoController } from './todo.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Todo } from './todo.model';
import { UserMiddleware } from '../user/user.middleware';

@Module({
  imports: [SequelizeModule.forFeature([Todo])],
  controllers: [TodoController],
  providers: [TodoService],
})
export class TodoModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(UserMiddleware).forRoutes(TodoController);
  }
}
