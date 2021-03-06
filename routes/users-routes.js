const express = require("express");
const { check } = require("express-validator");

const usersController = require("../controllers/users-controller");
// const checkAuth = require("../middleware/check-auth");

const router = express.Router();

// router.use(checkAuth);
router.get("/:userId", usersController.getUserDetails);

router.post(
  "/signup",
  [
    check("name").not().isEmpty(),
    check("email").normalizeEmail().isEmail(),
    check("password").isLength({ min: 6 }),
    check("confirm").isLength({ min: 6 }),
    check("phone").isLength({ min: 10 }),
    check("captcha").not().isEmpty(),
    check("agreement").not().isEmpty(),
    check("prefix").not().isEmpty()
  ],
  usersController.signup
);

router.post("/login", usersController.login);

router.post(
  "/add-cart",
  [
    check("title").not().isEmpty(),
    check("description").not().isEmpty(),
    check("image").not().isEmpty(),
    check("price").not().isEmpty(),
    check("quantity").not().isEmpty(),
  ],
  usersController.addCart
);

router.delete("/remove", usersController.removeItemFromCart);

router.delete("/decreaseItem", usersController.decreaseItemIncart);

module.exports = router;
