import fs from 'fs-extra';
import path from 'path';
import winston from 'winston';

const logDir = path.resolve('observability/logs');
fs.ensureDirSync(logDir);

export const logger = winston.createLogger({
  level: process.env.LOG_LEVEL ?? 'info',
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.printf(({ timestamp, level, message }) => `${timestamp} [${level}] ${message}`)
  ),
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({ filename: path.join(logDir, 'framework.log') })
  ]
});
