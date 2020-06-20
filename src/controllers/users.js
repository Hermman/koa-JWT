const jsonwebtoken = require("jsonwebtoken");
const User = require("../models/users");
const { secret } = require("../config");

class UsersCtl {
  // 授权中间件
  async checkOwner(ctx, next) {
    if (ctx.params.id !== ctx.state.user._id) {
      ctx.throw(403, "没有授权");
    }
    await next();
  }
  async find(ctx) {
    const { per_page = 10 } = ctx.query;
    const page = Math.max(ctx.query.page * 1, 1) - 1;
    const prePage = Math.max(per_page * 1, 1);
    ctx.body = await User.find()
      .limit(prePage)
      .skip(page * prePage);
  }

  async findById(ctx) {
    const { fields } = ctx.query;
    const selectFields = fields
      .split(";")
      .filter((f) => f)
      .map((f) => " +" + f)
      .join("");
    const user = await User.findById(ctx.params.id).select(selectFields);
    if (!user) {
      ctx.throw(404, "用户不存在");
    }
    ctx.body = user;
  }

  async create(ctx) {
    ctx.verifyParams({
      name: { type: "string", required: true },
      password: { type: "string", required: true },
    });
    const { name } = ctx.request.body;
    const repeatedUser = await User.findOne({ name });
    if (repeatedUser) {
      ctx.throw(409, "用户名已存在");
    }
    const user = await new User(ctx.request.body).save();
    ctx.body = user;
  }

  async update(ctx) {
    ctx.verifyParams({
      name: { type: "string", required: false },
      password: { type: "string", required: false },
      avatar_url: { type: "string", requied: false },
      gender: { type: "string", requied: false },
      headline: { type: "string", requied: false },
      locations: { type: "array", itemType: "object", requied: false },
    });

    const user = await User.findByIdAndUpdate(ctx.params.id, ctx.request.body);
    if (!user) {
      ctx.throw(404);
    }
    ctx.body = user;
  }

  async delete(ctx) {
    if (ctx.params.id * 1 >= db.length) {
      ctx.throw(412, "先决条件失败: id 大于等于数据长度了");
    }
    const user = await User.findByIdAndRemove(ctx.params.id);
    if (!user) {
      ctx.throw(404);
    }
    ctx.status = 204;
  }

  // 实现登录接口
  async login(ctx) {
    ctx.verifyParams({
      name: { type: "string", required: true },
      password: { type: "string", required: true },
    });
    const user = await User.findOne(ctx.request.body);
    if (!user) {
      ctx.throw(401, "用户名或密码不正确");
    }
    const { _id, name } = user;
    const token = jsonwebtoken.sign({ _id, name }, secret, {
      expiresIn: 60 * 60,
    });
    ctx.body = {
      token,
    };
  }

  // 获取关注人列表接口
  async listFollowing(ctx) {
    const user = await (await User.findById(ctx.params.id))
      .isSelected("+following")
      .populate("following");
    if (!user) {
      ctx.throw(404);
    }
    ctx.body = user.following;
  }

  // 获取粉丝接口
  async listFollowers(ctx) {
    const users = await User.find({ following: ctx.params.id });
    ctx.body = users;
  }

  // 用户存在与否中间件
  async checkUserExist(ctx, next) {
    const user = await User.findById(ctx.state.user.__id);
    if (!user) {
      ctx.throw(404, "用户不存在");
    }
    await next();
  }

  // 关注接口
  async follow(ctx) {
    const me = await (await User.findById(ctx.state.user.__id)).select(
      "+following"
    );
    if (!me.following.map((id) => id.toString()).includes(ctx.params.id)) {
      me.following.push(ctx.params.id);
      me.save();
    }
    ctx.status = 204;
  }

  // 取消关注
  async unfollow(ctx) {
    const me = await (await User.findById(ctx.state.user.__id)).select(
      "+following"
    );
    const index = me.following
      .map((id) => id.toString())
      .indexOf(ctx.params.id);
    if (index > -1) {
      me.following.splice(index, 1);
      me.save();
    }
  }
}

module.exports = new UsersCtl();
