import { ExceptionFilter, Catch, ArgumentsHost } from '@nestjs/common';
import { FastifyReply, FastifyRequest } from 'fastify';
import { BusinessException } from 'src/generic/businessexception';

@Catch(BusinessException)
export class BusinessExceptionFilter implements ExceptionFilter {
  catch(exception: BusinessException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<FastifyReply>();
    const request = ctx.getRequest<FastifyRequest>();

    response.status(exception.code).send({
      message: exception.reasons,
      timestamp: new Date().toISOString(),
      path: request.url,
      statusCode: exception.code,
    });
  }
}
