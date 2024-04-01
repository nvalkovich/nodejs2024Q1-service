import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { Logger } from './logger.service';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  constructor(private readonly logger: Logger) {}

  use(request: Request, response: Response, next: NextFunction): void {
    const { method, originalUrl, body, query } = request;

    this.logger.log(
      `REQUEST(${method}) --- URL: ${originalUrl} || QUERY: ${JSON.stringify(
        query,
      )} || BODY: ${JSON.stringify(body)}`,
    );

    response.on('finish', () => {
      const { statusCode } = response;

      this.logger.log(`RESPONSE --- STATUSCODE: ${statusCode}`);
    });

    next();
  }
}
