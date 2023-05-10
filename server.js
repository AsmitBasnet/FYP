const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const colors = require("colors");
const db = require("./config/db");
const path = require("path");
const { notFound, errorHandler } = require("./middleware/errorMiddleware");

// route
const userRoute = require("./routes/userRoute");
const productRoute = require("./routes/productRoute");
const uploadRoute = require("./routes/uploadRoute");
const orderRoute = require("./routes/orderRoute");
const reviewRoute = require("./routes/reviewRoute");

const app = express();
app.use(cors());

// connection to database
db.authenticate()
  .then((res) => console.log(`Database Connected`.bgYellow))
  .catch((err) => console.log(`Error:${err}`.red.inverse));

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

// app.use("/", (req, res) => {
//   res.send("hello");
// });
app.use("/api/user", userRoute);
app.use("/api/product", productRoute);
app.use("/api/upload", uploadRoute);
app.use("/api/order", orderRoute);
app.use("/api/review", reviewRoute);
let __variableOfChoice = path.resolve();
console.log(path.join(__variableOfChoice, "/uploads"));
app.use("/uploads", express.static(path.join(__variableOfChoice, "/uploads")));

// error handler
app.use(notFound);
app.use(errorHandler);

const PORT = 5000;

app.listen(PORT, () =>
  console.log(`Server Running on Port ${PORT}`.cyan.inverse)
);
