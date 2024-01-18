import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  Logger,
} from '@nestjs/common';
import { FastifyReply, FastifyRequest } from 'fastify';

import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

@Injectable()
export class LoggerInterceptor implements NestInterceptor {
  constructor(private logger: Logger) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const now = Date.now();
    const ctx = context.switchToHttp();
    const request = ctx.getRequest<FastifyRequest>();
    const response = ctx.getResponse<FastifyReply>();

    const pattern = request?.body;
    const headers = request?.headers;
    const patternQuery = request?.query;
    const patternParams = request?.params;
    const routePath = request?.url;
    const routeMethods = request?.method;
    const sanitizedRequest = this.maskSensitiveData(pattern);
    const sanitizedRequestQuery = this.maskSensitiveData(patternQuery);
    const sanitizedRequestParams = this.maskSensitiveData(patternParams);
    const trackingId = headers['trackingid'];

    this.logger.log(
      `Init transaction path: ${routePath}, method: ${JSON.stringify(
        routeMethods,
      )}, message body:${JSON.stringify(
        sanitizedRequest,
      )} query:${JSON.stringify(sanitizedRequestQuery)} params:${JSON.stringify(
        sanitizedRequestParams,
      )} `,
      trackingId,
    );

    return next.handle().pipe(
      tap(() => {
        const elapsed = Date.now() - now;
        this.logger.log(
          `Finished transaction path: ${routePath}, method: ${JSON.stringify(
            routeMethods,
          )}, response: ${response.statusCode} ${elapsed}ms`,
          trackingId,
        );
      }),
      catchError((error) => {
        const elapsed = Date.now() - now;

        this.logger.error(
          `Error handling path: ${routePath}, method: ${JSON.stringify(
            routeMethods,
          )}, message: ${JSON.stringify(sanitizedRequest)} ${elapsed}ms`,
          error,
          trackingId,
        );
        return throwError(() => error);
      }),
    );
  }

  private maskSensitiveData(data: any): any {
    if (data && typeof data === 'object') {
      const maskedData: { [key: string]: any } = {};

      for (const key in data) {
        if (Object.prototype.hasOwnProperty.call(data, key)) {
          if (typeof data[key] === 'string' && this.isSensitiveData(key)) {
            maskedData[key] = '*****';
          } else {
            maskedData[key] = data[key];
          }
        }
      }

      return maskedData;
    }

    return data;
  }

  private isSensitiveData(key: string): boolean {
    const sensitiveKeywords = [
      'password',
      'aditionalContact',
      'principalContact',
    ];

    return sensitiveKeywords.some((keyword) =>
      key.toLowerCase().includes(keyword.toLocaleLowerCase()),
    );
  }
}
