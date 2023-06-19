const express = require("express");
const app = express();
const { config } = require("dotenv");
const { connect } = require("mongoose");
const morgan = require("morgan");
var cors = require("cors");
require("./Models/userModel");
require("./Models/orderModel");
require("./Models/movieModel");
require("./Models/reviewModel");
require("./Models/productModel");

const accountRouter = require("./Routes/account.routes");
const { authentication } = require("./Middlewares/auth");
const userRouter = require("./Routes/user.routes");
const movieRoute = require("./Routes/movieRoute");
const reviewRoute = require("./Routes/reviewRoute");
const orderRoute = require("./Routes/orderRoute");
const productRoute = require("./Routes/productRoute");

config();
const port = process.env.PORT || 8080;

app.use(morgan(":method :url"));
app.use(cors());

connect(process.env.Atlas_URL)
  .then(() => {
    console.log("connect DB");
    app.listen(port, () => console.log(`listening on port ${port}!`));
  })
  .catch((error) => console.log(error));

app.use(express.json());

app.use(accountRouter);
app.use(authentication);
app.use(userRouter);
app.use(movieRoute);
app.use(orderRoute);
app.use(reviewRoute);
app.use(productRoute);

app.use((req, res) => res.status(404).json({ massage: "not found" }));

app.use((error, req, res, next) => {
  res.status(error.cause || 500).json({ massage: error.toString() });
});
