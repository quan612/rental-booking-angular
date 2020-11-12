const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");

const rentalRoutes = require("./routes/rentals");
const authRoutes = require("./routes/user");
const bookingRoutes = require("./routes/booking");
const imageUploadRoute = require("./routes/image-upload");

const { authUser } = require("./controllers/user");

const app = express();
const PORT = process.env.PORT || 3001;
const mongoose = require("mongoose");
const config = require("./config");
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

//routes
app.use("/api/v1/rentals/", rentalRoutes);
app.use("/api/v1/", authRoutes);
app.use("/api/v1/bookings/", bookingRoutes);
app.use("/api/v1/image-upload", imageUploadRoute);

// for running production build in dist folder
// if (process.env.NODE_ENV === "production") {
const distPath = path.join(__dirname, "..", "dist");
app.use(express.static(distPath));

app.get("*", (req, res) => {
  res.sendFile(path.resolve(distPath, "index.html"));
});
// }

app.listen(PORT, () => {
  console.log("server is running");
});
