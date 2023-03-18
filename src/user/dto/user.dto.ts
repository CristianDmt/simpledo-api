import { Exclude, Expose } from 'class-transformer';
import { User } from '../user.model';

@Exclude()
export class UserDto {
  @Expose()
  email: string;

  @Expose()
  createdAt: string;

  constructor(user: Partial<User>) {
    Object.assign(this, user.get({ plain: true }));
  }
}
