import pino from 'pino';


export type LogLevel = 'info' | 'debug' | 'fatal' | 'error' | 'warn' | 'trace';


const logger = pino({
  level: process.env.NODE_ENV === 'production' ? 'info' : 'debug',
  transport: process.env.NODE_ENV !== 'production' ? {
    target: 'pino-pretty',
    options: { colorize: true },
  } : undefined,
  browser: {
    asObject: true
  }
});

// const transport = pino.transport({
//   target: 'pino-pretty',
//   options: {
//     colorize: true,
//     ignore: 'pid,hostname',
//     translateTime: 'yyyy-mm-dd HH:MM:ss'
//   }
// })

// export const logger = pino({
//   level: process.env.NODE_ENV === 'development' ? 'debug' : 'info',
//   browser: {
//     asObject: true
//   }
// }, transport)


export default logger;
