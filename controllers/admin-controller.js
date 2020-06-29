const { validationResult } = require("express-validator");
const mongoose = require("mongoose");
// const bcrypt = require("bcryptjs");
// const jwt = require("jsonwebtoken");

const HttpError = require("../models/http-error");
const Product = require("../models/product");

const getAdminProduct = async (req, res, next) => {
  let products;
  try {
     products = await Product.find();
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
      new HttpError("Invalid inputs passed jj, please check your data.", 422)
    );
  }
  const { title, description, image, price } = req.body;


  const createdProduct = new Product({
    title,
    description,
    image,
    price,
  });

  try {
    await createdProduct.save();
  } catch (err) {
    console.log(err);
    const error = new HttpError(
      "Creating product failed  ll, please try again.",
      500
    );
    return next(error);
  }

  res.status(201).json({ product: createdProduct });
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
    product = await Product.findById(productId);
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
    products = await Product.findById(productId).populate();
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

exports.addProduct = addProduct;
exports.getAdminProduct = getAdminProduct;
exports.editProduct = editProduct;
exports.deleteAdminProduct = deleteAdminProduct;
