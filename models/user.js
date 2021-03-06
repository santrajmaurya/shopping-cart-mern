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
  carts: [
      {
        productId: {
          type: Schema.Types.ObjectId,
          ref: "Product",
          required: true,
        },
        title: { type: String, required: true },
        description: { type: String, required: true },
        image: { type: String, required: true },
        price: { type: Number, required: true },
        quantity: { type: Number, required: true },
      },
    ],
});

userSchema.plugin(uniqueValidator);

module.exports = mongoose.model("User", userSchema);
