const mongoose = require("mongoose");

const { Schema, model } = mongoose;

const TopicsSchema = new Schema({
  __v: { type: Number, select: false },
  name: { type: String, required: true },
  avatar_url: { type: String },
  introduction: { type: String, select: false },
});

module.exports = model("Topics", TopicsSchema);
