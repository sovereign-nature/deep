import pino from 'pino';

//TODO: Add log level from config, different log levels for different environments
// import { APP_ID, LOG_LEVEL } from "./Config";
export const logger = pino({ name: 'deep-api' });
