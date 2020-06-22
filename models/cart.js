const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const cartSchema = new Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  image: { type: String, required: true },
  price: { type: Number, required: true },
  quantity: { type: Number, required: true },
  userId: { type: mongoose.Types.ObjectId, required: true, ref: "User" },
  productId: { type: mongoose.Types.ObjectId, required: true, ref: "Product" },
});

module.exports = mongoose.model("Cart", cartSchema);
