const mongoose = require("mongoose");

const { Schema, model } = mongoose;

const userSchema = new Schema({
  __v: { type: Number, select: false },
  name: { type: String, required: true },
  password: { type: Number, required: true, select: false },
  avatar_url: { type: String },
  gender: {
    type: String,
    enum: ["male", "female"],
    default: "male",
    required: true,
    select: false,
  },
  headline: { type: String },
  locations: { type: [{ type: String }], select: false },
  business: { type: String, select: false },
  employments: {
    type: [
      {
        company: { type: String },
        job: { type: String },
      },
    ],
    select: false,
  },
  educations: {
    type: [
      {
        shool: { type: String },
        major: { type: String },
        diploma: { type: Number, enum: [1, 2, 3, 4, 5] },
        graduation_year: { type: Number },
      },
    ],
    select: false,
  },
});

// model的第一个参数为集合的名字，（也就是数据库表的名字）
module.exports = model("user", userSchema);
