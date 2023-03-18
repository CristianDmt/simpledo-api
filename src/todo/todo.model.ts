import { Column, Default, Model, Table } from 'sequelize-typescript';

@Table({ tableName: 'todos' })
export class Todo extends Model<Todo> {
  @Column
  title: string;

  @Default(false)
  @Column({ defaultValue: true })
  completed: boolean;
}
