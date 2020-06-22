const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");

const Schema = mongoose.Schema;

const userSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  confirm: { type: String, required: true },
  phone: { type: Number, required: true },
  captcha: { type: String, required: true },
  agreement: { type: Boolean, required: true },
  prefix: { type: Number, required: true },
  carts: [{ type: mongoose.Types.ObjectId, required: true, ref: "Cart" }]
});

userSchema.plugin(uniqueValidator);

module.exports = mongoose.model("User", userSchema);
