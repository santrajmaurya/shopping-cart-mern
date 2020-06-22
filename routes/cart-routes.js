const express = require("express");
const { check } = require("express-validator");

const cartController = require("../controllers/cart-controller");

const router = express.Router();

router.post(
  "/add",
  [
    check("title").not().isEmpty(),
    check("description").not().isEmpty(),
    check("image").not().isEmpty(),
    check("price").not().isEmpty(),
    check("quantity").not().isEmpty()
  ],
  cartController.addCart
);

// router.patch(
//   "/:pid",
//   [check("title").not().isEmpty(), check("description").isLength({ min: 5 })],
//   placesController.updatePlace
// );

// router.delete("/:pid", placesController.deletePlace);

module.exports = router;
