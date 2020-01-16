import createError from 'http-errors';
import express from 'express';
import cookieParser from 'cookie-parser';
import routes from './routes';
import { logAccess } from './logBack';
import JwtUtil from './util/jwt';

const app = express();

// 设置跨域访问
app.all('*', (req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'X-Requested-With');
  res.header('Access-Control-Allow-Methods', 'PUT,POST,GET,DELETE,OPTIONS');
  res.header('X-Powered-By', ' 3.2.1');
  res.header('Content-Type', 'application/json;charset=utf-8');
  next();
});

app.use(logAccess());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// 拦截过滤请求
// app.use((req, res, next) => {
//   if (req.url !== '/user/login' && req.url !== '/user/register') {
//     // token可能存在post请求和get请求
//     const token = req.body.token || req.query.token || req.headers.token;
//     const jwt = new JwtUtil(token);
//     if (jwt.verifyToken() === 'err') {
//       res.json({
//         msg: 'token过期，请重新登录',
//         status: '403',
//         data: '',
//       });
//     } else {
//       next();
//     }
//   } else {
//     next();
//   }
// });

app.use('/', routes);
// catch 404 and forward to error handler
app.use((req, res, next) => {
  next(createError(404));
});

// error handler
app.use((err, req, res) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

export default app;
