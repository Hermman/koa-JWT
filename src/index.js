const Koa = require("koa");
const bodyParser = require("koa-bodyparser");
const error = require("koa-json-error");
const parameter = require("koa-parameter");
const app = new Koa();
const routing = require("./routes");

// 错误处理(1)
// 自己造轮子:编写错误处理中间件
// app.use(async (ctx, next) => {
//   try {
//     await next();
//   } catch (error) {
//     ctx.status = error.status || error.statusCode || 500;
//     ctx.body = {
//       message: error.message,
//     };
//   }
// });

// 错误处理(2)
// 使用第三方中间件
app.use(
  error({
    postFormat: (err, { stack, ...rest }) =>
      process.env.NODE_ENV === "production" ? rest : { stack, ...rest },
  })
);
app.use(bodyParser());
app.use(parameter(app));
routing(app);

app.listen(3000, () => console.log("程序运行在 3000 端口"));
