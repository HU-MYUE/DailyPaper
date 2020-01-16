import morgan from 'morgan';
import fs from 'fs';
import FileStreamRotator from 'file-stream-rotator';
import DailyRotateFile from 'winston-daily-rotate-file';
import path from 'path';
import {
  createLogger, format, transports, addColors,
} from 'winston';
import strftime from 'strftime';

const rootDirectory = path.join(__dirname, 'log');

// 确保日志目录存在
if (!fs.existsSync(rootDirectory)) {
  fs.mkdirSync(rootDirectory);
}

const tTimestamp = () => strftime('%D %T');

// 访问日志
const accessLogStream = FileStreamRotator.getStream({
  date_format: 'YYYY-MM-DD',
  filename: path.join(rootDirectory, 'access.log.%DATE%'),
  frequency: 'daily',
  verbose: false,
});

// 配置等级和颜色
const config = {
  levels: {
    error: 0,
    debug: 1,
    warn: 2,
    data: 3,
    info: 4,
    verbose: 5,
    silly: 6,
    http: 7,
  },
  colors: {
    error: 'red',
    debug: 'blue',
    warn: 'yellow',
    data: 'grey',
    info: 'green',
    verbose: 'cyan',
    silly: 'magenta',
    http: 'yellow',
  },
};

// 添加自定义颜色
addColors(config.colors);


const formatParams = (info) => {
  let { message } = info;
  const { timestamp, level } = info;
  message = message.replace(/[\r\n]/g, '');
  return `[${timestamp}] ${level}: ${message}`;
};

export function logAccess() {
  return morgan('dev', { stream: accessLogStream });
}

export const Log = createLogger({
  level: 'http',
  levels: config.levels,
  handleExceptions: true,
  json: true,
  maxsize: 5242880, // 5MB
  maxFiles: 5,
  format: format.combine(
    format.colorize(),
    format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
    format.printf(formatParams),
  ),
  transports: [
    new DailyRotateFile({
      filename: path.join(rootDirectory, 'info.log'),
      level: 'info',
      datePattern: 'YYYY-MM-DD',
      localTime: true,
      prepend: true,
      timestamp: tTimestamp,
    }),
    new transports.Console(),
    new transports.File({
      filename: path.join(rootDirectory, 'error.log'),
      level: 'error',
      timestamp: tTimestamp,
    })],
});
