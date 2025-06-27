// src/common/interceptors/logging.interceptor.ts

import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  Logger,
} from '@nestjs/common';
import { Observable, tap } from 'rxjs';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  private logger = new Logger('HTTP');

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const req = context.switchToHttp().getRequest();
    const { method, url, body, query, params, user } = req;
    const userInfo = user ? `[User: ${user.username || user.userId}]` : '';
    const now = Date.now();

    this.logger.log(
      `--> ${method} ${url} ${userInfo} | Query: ${JSON.stringify(query)} | Params: ${JSON.stringify(params)} | Body: ${JSON.stringify(body)}`,
    );

    return next.handle().pipe(
      tap({
        next: (response) => {
          this.logger.log(
            `<-- ${method} ${url} ${userInfo} | Response: ${JSON.stringify(response)} | +${Date.now() - now}ms`
          );
        },
        error: (error) => {
          this.logger.error(
            `<-- ${method} ${url} ${userInfo} | ERROR: ${error.message} | +${Date.now() - now}ms`,
          );
        },
      }),
    );
  }
}
