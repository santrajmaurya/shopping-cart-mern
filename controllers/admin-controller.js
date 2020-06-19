const { validationResult } = require("express-validator");
const mongoose = require("mongoose");

const HttpError = require("../models/http-error");
const Admin = require("../models/admin");
const User = require("../models/user");

// const getPlaceById = async (req, res, next) => {
//   const placeId = req.params.pid;

//   let place;

//   try {
//     place = await Place.findById(placeId);
//   } catch (err) {
//     const error = new HttpError(
//       "Something went wrong, could not find a place.",
//       500
//     );
//     return next(error);
//   }

//   if (!place) {
//     const error = new HttpError("Could not find a place for provided id.", 404);
//     return next(error);
//   }
//   res.json({ place: place.toObject({ getters: true }) });
// };

// const getPlacesByUserId = async (req, res, next) => {
//   const userId = req.params.uid;

//   let userWithPlaces;
//   try {
//     userWithPlaces = await User.findById(userId).populate('places');
//   } catch (err) {
//     const error = new HttpError(
//       "Feching places failed, please try again later.",
//       500
//     );
//     return next(error);
//   }

//   if (!userWithPlaces || userWithPlaces.places.length === 0) {
//     return next(
//       new HttpError("Could not find  places for provided user id.", 404)
//     );
//   }
//   res.json({
//     places: userWithPlaces.places.map((place) =>
//       place.toObject({ getters: true })
//     ),
//   });
// };

const getAdminProduct = async (req, res, next) => {
  let products;
  try {
     products = await Admin.find();
  } catch (err) {
    const error = new HttpError("Feching products failed, please try again.", 500);
    return next(error);
  }

  res.json({ products: products.map((product) => product.toObject({ getters: true })) });
};

const addProduct = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return next(
      new HttpError("Invalid inputs passed, please check your data.", 422)
    );
  }
  const { title, description, image, price } = req.body;

  const createdProduct = new Admin({
    title,
    description,
    image,
    price,
  });

  // let user;
  // try {
  //   user = await User.findById(userId);
  // } catch(err) {
  //   const error = new HttpError('Creating product failed, please try again later.', 500);
  //   return next(error);
  // }

  // if(!user) {
  //   const error = new HttpError('Could not find user for provided id.', 404);
  //   return next(error);
  // }

  try {
    // const sess = await mongoose.startSession();
    // sess.startTransaction();
    await createdProduct.save();
    // user.cart.products.push(createdProduct);
    // await user.save({session: sess});
    // await sess.commitTransaction();
  } catch (err) {
    const error = new HttpError(
      "Creating product failed, please try again.",
      500
    );
    return next(error);
  }
  res.status(201).json({ admin: createdProduct });
};

const editProduct = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    console.log(errors);
    return next (new HttpError("Invalid inputs passed, please check your data.", 422));
  }
  const { title, description, image, price } = req.body;
  const productId = req.params.productId;

  let product;
  try {
    product = await Admin.findById(productId);
  } catch (err) {
    const error = new HttpError(
      "Something went wrong, could not edit product.",
      500
    );
    return next(error);
  }
  product.title = title;
  product.description = description;
  product.image = image;
  product.price = price;

  try {
    await product.save();
  } catch (err) {
    const error = new HttpError(
      "Something went wrong, could not edit product.",
      500
    );
    return next(error);
  }

  res.status(200).json({ product: product.toObject({ getters: true }) });
};

const deleteAdminProduct = async (req, res, next) => {
  console.log('req', req.params);
  const productId = req.params.productId;

  let products;
  try {
    products = await Admin.findById(productId).populate();
  } catch (err) {
    const error = new HttpError(
      "Something went wrong, could not delete the place.",
      500
    );
    return next(error);
  }

  if (!products) {
    const error = new HttpError("Could not find product for this id.", 404);
    return next(error);
  }

  try {
    await products.remove();
  } catch (err) {
    const error = new HttpError(
      "Something went wrong, could not delete the place.",
      500
    );
    return next(error);
  }

  res.status(200).json({ message: "Deleted product." });
};

// exports.getPlaceById = getPlaceById;
// exports.getPlacesByUserId = getPlacesByUserId;
exports.addProduct = addProduct;
exports.getAdminProduct = getAdminProduct;
exports.editProduct = editProduct;
exports.deleteAdminProduct = deleteAdminProduct;
