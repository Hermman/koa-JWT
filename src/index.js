const Koa = require("koa");
const bodyParser = require("koa-bodyparser");
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

app.use(
  error({
    postFormat: (err, { stack, ...rest }) =>
      process.env.NODE_ENV === "production" ? rest : { stack, ...rest },
  })
);
app.use(bodyParser());
app.use(parameter(app));
routing(app);

app.listen(PORT, () => console.log(`The servivce starts at port ${PORT} `));
