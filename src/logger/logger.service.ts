import { Injectable, LoggerService } from '@nestjs/common';

@Injectable()
export class Logger implements LoggerService {
  log(message: string) {
    console.log(message);
  }
  error(message: string) {
    console.error(message);
  }
  warn(message: string) {
    console.warn(message);
  }
}
