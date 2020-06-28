const { validationResult } = require("express-validator");
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const HttpError = require("../models/http-error");
const User = require("../models/user");

const signup = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    console.log(errors);
    return next(
      new HttpError("Invalid inputs passed, please check your data.", 422)
    );
  }
  const {
    name,
    email,
    password,
    confirm,
    phone,
    captcha,
    agreement,
    prefix,
  } = req.body;

  let existingUser;

  try {
    existingUser = await User.findOne({ email: email });
  } catch (err) {
    const error = new HttpError(
      "Signing up failed, please try again later.",
      500
    );
    return next(error);
  }

  if (existingUser) {
    const error = new HttpError(
      "User exist already, please login instead.",
      422
    );
    return next(error);
  }
  
  let hashedPassword, hashedConfirm;
  try {
    hashedPassword = await bcrypt.hash(password, 12);
    hashedConfirm = await bcrypt.hash(confirm, 12);
  } catch(err) {
    const error = new HttpError('Could not create user, please try again', 500);
    return next(error);
  }

  const createdUser = new User({
    name,
    email,
    password: hashedPassword,
    confirm: hashedConfirm,
    phone,
    captcha,
    agreement,
    prefix,
    carts: [],
  });

  try {
    await createdUser.save();
  } catch (err) {
    const error = new HttpError("Signing up failed, please try again.", 500);
    return next(error);
  }
  
  let token;
  try {
  token = jwt.sign(
    { userId: createdUser.id, email: createdUser.email },
    "supersecret_dont_share",
    { expiresIn: "5h" }
  );
  } catch(err) {
    const error = new HttpError("Signing up failed, please try again.", 500);
    return next(error);
  }

  res
    .status(201)
    .json({ user: createdUser.toObject({ getters: true }), token: token });
};

const login = async (req, res, next) => {
  const { email, password } = req.body;

  let existingUser;
  try {
    existingUser = await User.findOne({ email: email });
  } catch (err) {
    const error = new HttpError(
      "Logging in failed, please try again later.",
      500
    );
    return next(error);
  }

  if (!existingUser) {
    const error = new HttpError(
      "Invalid credentials, could not log you in.",
      401
    );
    return next(error);
  }

  let isValidPassword = false;
  try {
    isValidPassword = await bcrypt.compare(password, existingUser.password);
  } catch(err) {
    const error = new HttpError('Could not log you in, please check credetials and try again.', 500);
    return next(error);
  }
  
  if (!isValidPassword) {
    const error = new HttpError(
      "Invalid credentials, could not log you in.",
      401
    );
    return next(error);

  } 

  let token;
  try {
    token = jwt.sign(
      { userId: existingUser.id, email: existingUser.email },
      "supersecret_dont_share",
      { expiresIn: "5h" }
    );
  } catch (err) {
    const error = new HttpError("Logging up failed, please try again.", 500);
    return next(error);
  }

    res.status(201).json({
      message: "Logged in!",
      user: existingUser.toObject({ getters: true }),
      token: token
    });
};

const addCart = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return next(
      new HttpError("Invalid inputs passed, please check your data.", 422)
    );
  }
  const { userId } = req.body;

  let user;
  try {
    user = await User.findById(userId);
  } catch (err) {
    const error = new HttpError(
      "Creating cart failed, please try again later.",
      500
    );
    return next(error);
  }

  if (!user) {
    const error = new HttpError("Could not find user for provided id.", 404);
    return next(error);
  }

  try {
    if (user.carts !== null) {
      const { productId } = req.body;
      const cartProductIndex = user.carts.findIndex((cp) => {
        return cp.productId.toString() === productId.toString();
      });
      if (cartProductIndex >= 0) {
        user.carts[cartProductIndex].quantity =
          user.carts[cartProductIndex].quantity + 1;
        await user.save();
      } else if (cartProductIndex === -1) {
        const { title, description, image, price, quantity, productId } = req.body;
        let createdCart = {};
        createdCart.title = title;
        createdCart.description = description;
        createdCart.image = image;
        createdCart.price = price;
        createdCart.quantity = quantity;
        createdCart.productId = productId;
        user.carts.push(createdCart);
        await user.save();
      }
    } else {
      const { title, description, image, price, quantity, productId } = req.body;
      let createdCart = {};
      createdCart.title = title;
      createdCart.description = description;
      createdCart.image = image;
      createdCart.price = price;
      createdCart.quantity = quantity;
      createdCart.productId = productId;
      user.carts.push(createdCart);
      await user.save();
    }
  } catch (err) {
    console.log("err", err);
    const error = new HttpError(
      "Creating cart failed , please try again.",
      500
    );
    return next(error);
  }
  res.status(201).json({ user: user });
};

const removeItemFromCart = async (req, res, next) => {
  const {userId, productId} = req.body;
  let user, item;
   try {
     user = await User.findById(userId);
     item = user.carts.find((product) => {
       return product.productId.toString() === productId.toString();
     });
   } catch (err) {
     const error = new HttpError(
       "Removing item failed, please try again later.",
       500
     );
     return next(error);
   }
  
  try {
        const sess = await mongoose.startSession();
        sess.startTransaction();
        await item.remove();
        await user.save({session: sess});
        await sess.commitTransaction();
      } catch (err) {
    console.log("err", err);
    const error = new HttpError(
      "Removing item failed , please try again.",
      500
    );
    return next(error);
  }

  res.status(200).json({ message: "Deleted product.", user: user });
};

const decreaseItemIncart = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return next(
      new HttpError("Invalid inputs passed, please check your data.", 422)
    );
  }
  const { userId, productId } = req.body;

  let user, item;
  try {
    user = await User.findById(userId);
    item = user.carts.find((product) => {
      return product.productId.toString() === productId.toString();
    });
  } catch (err) {
    const error = new HttpError(
      "Removing item from cart failed, please try again later.",
      500
    );
    return next(error);
  }

  if (!user) {
    const error = new HttpError("Could not find user for provided id.", 404);
    return next(error);
  }

  try {
    if (item.quantity > 1) {
      const { productId } = req.body;
      const cartProductIndex = user.carts.findIndex((cp) => {
        return cp.productId.toString() === productId.toString();
      });
      if (cartProductIndex >= 0) {
        user.carts[cartProductIndex].quantity =
          user.carts[cartProductIndex].quantity - 1;
        await user.save();
      } 
    } else {
      const sess = await mongoose.startSession();
      sess.startTransaction();
      await item.remove();
      await user.save({ session: sess });
      await sess.commitTransaction();
    }
    
  } catch (err) {
    console.log("err", err);
    const error = new HttpError(
      "Removing item from cart failed , please try again.",
      500
    );
    return next(error);
  }
  res.status(201).json({ user: user });
};

exports.signup = signup;
exports.login = login;
exports.addCart = addCart;
exports.removeItemFromCart = removeItemFromCart;
exports.decreaseItemIncart = decreaseItemIncart;
