import { ExceptionFilter, Catch, ArgumentsHost } from '@nestjs/common';
import { FastifyReply, FastifyRequest } from 'fastify';
import { IllegalValueException } from 'src/generic/illegalvalueexception';

@Catch(IllegalValueException)
export class IllegalValueExceptionFilter implements ExceptionFilter {
  catch(exception: IllegalValueException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<FastifyReply>();
    const request = ctx.getRequest<FastifyRequest>();

    response.status(400).send({
      message: exception.message,
      timestamp: new Date().toISOString(),
      path: request.url,
      type: 'Value=' + exception.type,
    });
  }
}
