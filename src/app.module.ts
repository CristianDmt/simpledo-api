import { Module } from '@nestjs/common';
import { AppService } from './app.service';
import { TodoModule } from './todo/todo.module';
import { UserModule } from './user/user.module';
import { SequelizeModule } from '@nestjs/sequelize';
import { Todo } from './todo/todo.model';
import { User } from './user/user.model';

@Module({
  imports: [
    SequelizeModule.forRoot({
      dialect: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'root',
      database: 'local',
      autoLoadModels: true,
      synchronize: true,
    }),
    TodoModule,
    UserModule,
  ],
  providers: [AppService],
})
export class AppModule {}
