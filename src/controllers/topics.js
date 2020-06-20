const Topic = require("../models/topics");

class TopicsCtl {
  // 增加话题
  async create(ctx) {
    ctx.verifyParams({
      name: { type: "string", required: true },
      avatar_url: { type: "string", required: true },
      introduction: { type: "string", required: false },
    });
    const topic = await Topic(ctx.request.body).save();
    ctx.body = topic;
  }

  // 修改话题
  async update(ctx) {
    ctx.verifyParams({
      name: { type: "string", required: false },
      avatar_url: { type: "string", required: false },
      introduction: { type: "string", required: false },
    });

    // 返回更新前的topic
    const topic = await Topic.findByIdAndUpdate(
      ctx.params.id,
      ctx.request.body
    );
    ctx.body = topic;
  }

  // 查找所有话题
  async find(ctx) {
    const { per_page = 10 } = ctx.query;
    const page = Math.max(ctx.query.page * 1, 1) - 1;
    const prePage = Math.max(per_page * 1, 1);
    // 使用正则表达式匹配模糊搜索
    ctx.body = await Topic.find({ name: new RegExp(ctx.query.q) })
      .limit(prePage)
      .skip(page * prePage);
  }

  // 查询特定话题
  async findById(ctx) {
    const { fields } = ctx.query;
    const selectFiels = fields
      .split(";")
      .filter((f) => f)
      .map((f) => " +" + f)
      .join("");
    const topic = await Topic.findById(ctx.params.id).select(selectFiels);
    ctx.body = topic;
  }
}

module.exports = new TopicsCtl();
