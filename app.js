const express = require('express');
const morgan = require('morgan');
const rateLimit = require('express-rate-limit');
const helmet = require('helmet');
const mongoSanitize = require('express-mongo-sanitize');
const xss = require('xss-clean');
const hpp = require('hpp');
const compression = require('compression')
const userRouter = require('./routes/userRouter');
const postRouter = require('./routes/postRouter');
const storyRouter = require('./routes/storiesRouter')
const AppError = require('./utils/AppError');
const globalErrorHandler = require('./controller/errorController');
const app = express();
app.use(helmet());
const limiter = rateLimit({
  max: 100,
  windowMs: 60 * 60 * 1000,
  message: 'Too many requests from this IP, please try again in an hour!',
});
app.use('/users/login', limiter);

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}
app.use(express.json())
app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();

  next();
});
app.use('/users/login', limiter);
app.use(mongoSanitize());
app.use(xss());
app.use(compression())

app.use('/posts', postRouter);
app.use('/users', userRouter);
app.use('/story', storyRouter);
app.all('*', (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});
app.use(globalErrorHandler);

module.exports = app;
