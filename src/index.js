const Koa = require("koa");
const Router = require("koa-router");
const app = new Koa();
const router = new Router();
const routing = require("./routes");

app.use(router.routes());
routing(app);

app.listen(3000, () => console.log("程序运行在 3000 端口"));
