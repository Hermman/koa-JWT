const Router = require("koa-router");
const jsonwebtoken = require("jsonwebtoken");
const router = new Router({ prefix: "/users" });
const {
  find,
  findById,
  create,
  update,
  delete: del,
  login,
  checkOwner,
  listFollowing,
  unfollow,
  listFollowers,
} = require("../controllers/users");
const { secret } = require("../config");

// 认证中间件
const auth = async (ctx, next) => {
  const { authorization = "" } = ctx.request.header;
  const token = authorization.replace("Bearer ", "");
  try {
    const user = jsonwebtoken.verify(token, secret);
    ctx.state.user = user;
  } catch (err) {
    ctx.throw(401, err.message);
  }

  await next();
};

router.get("/", find);

router.post("/", create);

router.get("/:id", findById);

// router.put("/:id", update); // put会整体替换

router.patch("/:id", auth, checkOwner, update); // patch 会局部替换

router.delete("/:id", auth, checkOwner, del);

router.post("/login", login);

router.get("/:id/following", listFollowing);

router.get("/:id/followers", listFollowers);

router.put("/following/:id", auth);

router.delete("/following/:id", auth, unfollow);

module.exports = router;
