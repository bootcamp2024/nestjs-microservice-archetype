import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  Logger,
} from '@nestjs/common';

import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

@Injectable()
export class LoggerInterceptor implements NestInterceptor {
  constructor(private logger: Logger) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const pattern = context.switchToHttp()?.getRequest()?.body;
    const headers = context.switchToHttp()?.getRequest()?.headers;
    const patternQuery = context.switchToHttp()?.getRequest()?.query;
    const patternParams = context.switchToHttp()?.getRequest()?.params;
    const routePath = context.switchToHttp()?.getRequest()?.route?.path;
    const routeMethods = context.switchToHttp()?.getRequest()?.route?.methods;
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
        this.logger.log(
          `Finished transaction path: ${routePath}, method: ${JSON.stringify(
            routeMethods,
          )}, message: OK`,
          trackingId,
        );
      }),
      catchError((error) => {
        this.logger.error(
          `Error handling path: ${routePath}, method: ${JSON.stringify(
            routeMethods,
          )}, message: ${JSON.stringify(sanitizedRequest)}`,
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
