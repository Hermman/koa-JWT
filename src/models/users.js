const mongoose = require("mongoose");

const { Schema, model } = mongoose;

const userSchema = new Schema({
  __v: { type: Number, select: false },
  name: { type: String, required: true },
  password: { type: Number, required: true, select: false },
});

// model的第一个参数为集合的名字，（也就是数据库表的名字）
module.exports = model("user", userSchema);
