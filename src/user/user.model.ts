import { Column, Model, Table, Unique } from 'sequelize-typescript';

@Table({ tableName: 'users' })
export class User extends Model<User> {
  @Column
  fullName: string;

  @Unique
  @Column
  email: string;

  @Column
  password: string;
}
