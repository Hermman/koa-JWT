const db = [{ name: "李雷" }];
class UsersCtl {
  find(ctx) {
    ctx.body = db;
  }
  findById(ctx) {
    if (ctx.params.id * 1 >= db.length) {
      ctx.throw(412, "先决条件失败: id 大于等于数据长度了");
    }
    ctx.body = db[ctx.params.id * 1];
  }
  create(ctx) {
    db.push(ctx.request.body);
    ctx.body = ctx.request.body;
  }
  update(ctx) {
    db[ctx.params.id * 1] = ctx.request.params.id;
    ctx.body = ctx.request.body;
  }
  delete(ctx) {
    db.splice(ctx.params.id * 1, 1);
    ctx.status = 204;
  }
}

module.exports = new UsersCtl();