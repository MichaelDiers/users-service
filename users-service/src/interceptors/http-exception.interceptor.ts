import {
  CallHandler,
  ExecutionContext,
  HttpException,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';
import { catchError, Observable } from 'rxjs';

/**
 * Interceptor for rethrowing a HttpException as a RpcException.
 */
@Injectable()
export class HttpExceptionInterceptor implements NestInterceptor {
  /**
   * Intercept HttpExceptions and rethrow as RpcException.
   * @param context The current execution context.
   * @param next The next call handler.
   * @returns An Observable<T> of any.
   */
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      catchError((error) => {
        if (error instanceof HttpException) {
          throw new RpcException(error);
        } else {
          throw error;
        }
      }),
    );
  }
}
