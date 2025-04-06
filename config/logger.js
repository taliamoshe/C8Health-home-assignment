const winston = require('winston');

// Set up the logger
const logger = winston.createLogger({
  level: 'info', // Minimum log level (can be 'info', 'warn', 'error', etc.)
  transports: [
    // Console transport to log to the console
    new winston.transports.Console({ format: winston.format.simple() }),

    new winston.transports.File({
      filename: 'logs/app.log',
      level: 'info', // Logs with 'info' level or higher
      format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.json() // Store logs in JSON format
      ),
    }),
  ],
});

module.exports = logger;
