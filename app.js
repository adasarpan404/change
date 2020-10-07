const express = require('express');
const morgan = require('morgan');
const userRouter = require('./routes/userRouter');
const postRouter = require('./routes/postRouter');
const AppError = require('./utils/AppError');
const globalErrorHandler = require('./controller/errorController');
const app = express();

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}
app.use(express.json())
app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();

  next();
});

app.use('/posts', postRouter);
app.use('/users', userRouter);
app.all('*', (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});
app.use(globalErrorHandler);

module.exports = app;
