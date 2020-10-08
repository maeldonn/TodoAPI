const rateLimit = require('express-rate-limit');
const slowDown = require('express-slow-down');

const rateLimiter = () => rateLimit({
  windowMs: 10 * 60 * 1000,
  max: 100,
});

const speedLimiter = () => slowDown({
  windowMs: 10 * 60 * 1000,
  delayAfter: 50,
  delayMs: process.env.NODE_ENV === 'test' ? 0 : 200,
});

const notFound = (req, res, next) => {
  res.status(404);
  const error = new Error(`🔍 - Not Found - ${req.originalUrl}`);
  next(error);
};

/* eslint-disable no-unused-vars */
const errorHandler = (err, req, res, next) => {
  /* eslint-enable no-unused-vars */
  const statusCode = res.statusCode !== 200 ? res.statusCode : 500;
  res.status(statusCode);
  res.json({
    message: err.message,
    stack: process.env.NODE_ENV === 'production' ? '🥞' : err.stack,
  });
};

module.exports = {
  rateLimiter,
  speedLimiter,
  notFound,
  errorHandler,
};
