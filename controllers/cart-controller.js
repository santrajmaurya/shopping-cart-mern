const { validationResult } = require("express-validator");
const mongoose = require("mongoose");

const HttpError = require("../models/http-error");
const User = require("../models/user");
const Cart = require("../models/cart");

const addCart = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return next(
      new HttpError("Invalid inputs passed, please check your data.", 422)
    );
  }
  const {
    title,
    description,
    image,
    price,
    quantity,
    userId,
    productId,
  } = req.body;

  let user;
  try {
    user = await User.findById(userId);
  } catch (err) {
    const error = new HttpError(
      "Creating cart failed kk, please try again later.",
      500
    );
    return next(error);
  }

  if (!user) {
    const error = new HttpError("Could not find user for provided id.", 404);
    return next(error);
  }

  let createdCart;
  try {
    createdCart = await Cart.findOne({ productId: productId });
    console.log("createdCart", createdCart);
    console.log("productId", productId);
    if (createdCart !== null) {
      createdCart.quantity = createdCart.quantity + 1;
      await createdCart.save();
    } else {
      createdCart = new Cart({
        title,
        description,
        image,
        price,
        productId,
        quantity,
        userId,
      });
      const sess = await mongoose.startSession();
      sess.startTransaction();
      await createdCart.save({ session: sess });
      user.carts.push(createdCart);
      await user.save({ session: sess });
      await sess.commitTransaction();
    }
    
  } catch (err) {
    console.log('err', err);
    const error = new HttpError(
      "Creating cart failed rrr, please try again.",
      500
    );
    return next(error);
  }
  res.status(201).json({ cart: createdCart });
};

exports.addCart = addCart;
