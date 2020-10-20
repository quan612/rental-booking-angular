const express = require("express");
const bodyParser = require("body-parser");

const rentalRoutes = require("./routes/rentals");
const authRoutes = require("./routes/user");
const { authUser } = require("./controllers/user");

const app = express();
const PORT = process.env.PORT || 3001;
const mongoose = require("mongoose");
const config = require("./config/dev");
const { errorHandler } = require("./middlewares");

mongoose.connect(
  config.DB_URI,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  },
  () => {
    console.log("Connected to Mongo Atlas");
  }
);

// middleware
app.use(bodyParser.json());
app.use(errorHandler);

app.get("/api/v1/secret", authUser, (req, res) => {
  return res.json({ message: "secret route accessed" });
});

//routes
app.use("/api/v1/rentals", rentalRoutes);
app.use("/api/v1/", authRoutes);

// models

app.listen(PORT, () => {
  console.log("server is running");
});
