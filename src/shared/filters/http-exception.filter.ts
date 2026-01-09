import {
    ArgumentsHost,
    Catch,
    ExceptionFilter,
    HttpException,
    HttpStatus,
  } from '@nestjs/common';
  
  @Catch()
  export class GlobalHttpExceptionFilter implements ExceptionFilter {
    catch(exception: unknown, host: ArgumentsHost) {
      const ctx = host.switchToHttp();
      const response = ctx.getResponse();
  
      let status = HttpStatus.INTERNAL_SERVER_ERROR;
      let body: any = {
        success: false,
        status,
        errors: {
          message: 'Internal server error',
        },
      };
  
      if (exception instanceof HttpException) {
        status = exception.getStatus();
        const res = exception.getResponse();
  
        body = {
          success: false,
          status,
          ...(typeof res === 'string'
            ? { errors: { message: res } }
            : res),
        };
      }
  
      response.status(status).json(body);
    }
  }
  