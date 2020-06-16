const Koa = require("koa");
const bodyParser = require("koa-bodyparser");
const app = new Koa();
const routing = require("./routes");

app.use(async (ctx, next) => {
  try {
    await next();
  } catch (error) {
    ctx.status = error.status || error.statusCode || 500;
    ctx.body = {
      message: error.message,
    };
  }
});

app.use(bodyParser());
routing(app);

app.listen(3000, () => console.log("程序运行在 3000 端口"));
