const express = require("express");
const { check } = require("express-validator");

const adminController = require("../controllers/admin-controller");

const router = express.Router();

router.get("/", adminController.getAdminProduct);

// router.get("/user/:uid", placesController.getPlacesByUserId);

router.post(
  "/add-product",
  [
    check("title").not().isEmpty(),
    check("description").isLength({ min: 5 }),
    check("image").not().isEmpty(),
    check("price").not().isEmpty()
  ],
  adminController.addProduct
);

router.patch(
  "/edit-product/:productId",
  [
    check("title").not().isEmpty(),
    check("description").isLength({ min: 5 }),
    check("image").not().isEmpty(),
    check("price").not().isEmpty()
  ],
  adminController.editProduct
);

router.delete("/:productId", adminController.deleteAdminProduct);

module.exports = router;
