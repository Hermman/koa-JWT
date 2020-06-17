const Router = require("koa-router");
const router = new Router({ prefix: "/users" });
const {
  find,
  findById,
  create,
  update,
  delete: del,
  login,
} = require("../controllers/users");

router.get("/", find);

router.post("/", create);

router.get("/:id", findById);

// router.put("/:id", update); // put会整体替换

router.patch("/:id", update); // patch 会局部替换

router.delete("/:id", del);

router.post("/login", login);

module.exports = router;
