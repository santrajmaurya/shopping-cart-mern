const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path');
const mongoose = require("mongoose");

const errorController = require("./controllers/error");

const usersRoutes = require("./routes/user-routes");
const adminRoutes = require("./routes/admin-routes");
const shopRoutes = require("./routes/product-routes");
// const authRoutes = require("./routes/auth");
const HttpError = require("./models/http-error");

if(process.env.NODE_ENV !== 'production') require('dotenv').config();

const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

const app = express();
const port = process.env.PORT || 6000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true}));

app.use(cors());

if(process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, 'client/build')));

    app.get('*', function(req, res) {
        res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
    })
}

app.use("/api/users", usersRoutes);
app.use("/admin", adminRoutes);
app.use(shopRoutes);
// app.use(authRoutes);

app.use(errorController.get404);


app.use((req, res, next) => {
  const error = new HttpError("Could not find this route", 404);
  throw error;
});

app.use((error, req, res, next) => {
  if (res.headerSent) {
    return next(error);
  }
  res.status(error.code || 500);
  res.json({ message: error.message || "An error occurred" });
});

mongoose
  .connect(
    "mongodb+srv://santraj:vsxX6nIiRtUTibOB@cluster0-p3ikr.mongodb.net/clothing-shop?retryWrites=true&w=majority"
  )
  .then(() => {
    app.listen(port, (error) => {
      console.log("Server is running on port " + port);
    });
  })
  .catch((err) => {
    console.log(err);
  });

app.post('/payment', (req, res) => {
    const body = {
        source: req.body.token.id,
        amount: req.body.amount,
        currency: 'inr'
    }

    stripe.charges.create(body, (stripeErr, stripeRes) => {
        if(stripeErr) {
            res.status(500).send({error: stripeErr});
        } else {
            res.status(200).send({success: stripeRes});
        }
    });
})