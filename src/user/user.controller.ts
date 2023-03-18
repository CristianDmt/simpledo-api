import { Body, Controller, HttpCode, HttpStatus, Post } from "@nestjs/common";
import { UserService } from './user.service';
import { CreateTodoDto } from "../todo/dto/create-todo.dto";
import { TodoDto } from "../todo/dto/todo.dto";
import { AuthUserDto } from "./dto/auth-user.dto";
import { RegisterUserDto } from "./dto/register-user.dto";
import { User } from "./user.model";
import { UserDto } from "./dto/user.dto";

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('auth')
  @HttpCode(HttpStatus.OK)
  async login(@Body() authUserDto: AuthUserDto): Promise<{ token: string }> {
    return { token: await this.userService.auth(authUserDto) };
  }

  @Post('register')
  async register(@Body() registerUserDto: RegisterUserDto): Promise<UserDto> {
    return new UserDto(await this.userService.register(registerUserDto));
  }
}
