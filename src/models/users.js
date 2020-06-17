const mongoose = require("mongoose");

const { Schema, model } = mongoose;

const userSchema = new Schema({
  name: { type: String, required: true },
  age: { type: Number, default: 0, required: false },
});

// model的第一个参数为集合的名字，（也就是数据库表的名字）
module.exports = model("user", userSchema);
