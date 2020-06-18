const path = require("path");
const Koa = require("koa");
const koaStatic = require("koa-static");
const koaBody = require("koa-body");
const error = require("koa-json-error");
const parameter = require("koa-parameter");
const mongoose = require("mongoose");
const app = new Koa();
const routing = require("./routes");
const { connectionStr } = require("./config");

const PORT = 3000;

mongoose.connect(
  connectionStr,
  {
    useUnifiedTopology: true,
    useNewUrlParser: true,
  },
  () => console.log("MongoDB connected successfully！")
);
mongoose.connection.on("error", console.error);

app.use(koaStatic(path.join(__dirname, "public")));
app.use(
  error({
    postFormat: (err, { stack, ...rest }) =>
      process.env.NODE_ENV === "production" ? rest : { stack, ...rest },
  })
);
app.use(
  koaBody({
    multipart: true, // 支持文件上传格式请求
    formidable: {
      uploadDir: path.join(__dirname, "/public/uploads"),
      keepExtensions: true, // 保存文件扩展名
    },
  })
);
app.use(parameter(app));
routing(app);

app.listen(PORT, () => console.log(`The servivce starts at port ${PORT} `));
