import {
  Injectable,
  NestMiddleware,
  UnauthorizedException,
} from '@nestjs/common';
import * as jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';
import { AUTH_SCHEMA, JWT_SECRET } from '../const';

@Injectable()
export class UserMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    if (req.headers.authorization) {
      const [schema, token] = req.headers.authorization.split(' ');

      if (schema && schema !== AUTH_SCHEMA) {
        throw new UnauthorizedException('bad auth schema');
      }

      if (token) {
        try {
          const jwtData = jwt.verify(token, JWT_SECRET);
        } catch (error) {
          throw new UnauthorizedException('token expired');
        }
      } else {
        throw new UnauthorizedException('missing authorization token');
      }
    } else {
      throw new UnauthorizedException('missing authorization header');
    }

    next();
  }
}