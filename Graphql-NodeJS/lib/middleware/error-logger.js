module.exports = (err, req, res, next) => {
  const message = err.toJSON ? err.toJSON() : err.toString();

  global.logger.error(message, { js: 'middleware/error-logger.js' });
  next(err);
};
