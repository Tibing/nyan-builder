import { Logger, LoggerApi } from '@angular-devkit/core/src/logger/logger';
import { JsonObject } from '@angular-devkit/core/src/json/interface';

export class DeferredLogger implements LoggerApi {
  private lastLog: string;

  constructor(private logger: LoggerApi) {
  }

  createChild(name: string): Logger {
    return undefined;
  }

  debug(message: string, metadata?: JsonObject): void {
  }

  error(message: string, metadata?: JsonObject): void {
  }

  fatal(message: string, metadata?: JsonObject): void {
  }

  info(message: string, metadata?: JsonObject): void {
    this.lastLog = message;
  }

  log(level: 'debug' | 'info' | 'warn' | 'error' | 'fatal', message: string, metadata?: JsonObject): void {
  }

  warn(message: string, metadata?: JsonObject): void {
  }

  logLastMessage() {
    console.log(this.lastLog);
  }
}
