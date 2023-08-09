require("dotenv").config();
const express = require("express");
const rateLimit = require("express-rate-limit");
const db = require("./models/index");
const cors = require("cors");

const limiter = rateLimit({
  windowMs: 10 * 60 * 1000,
  max: 100,
  standardHeaders: true,
  legacyHeaders: false,
});

const PORT = process.env.PORT || 3000;

const app = express();

// Request limiter

// app.use(limiter);
// app.use(cors());

// Load router

const topRouter = require("./src/routes/top.router");
// Use Router

app.use("/top", topRouter);

// Error handler
const handleError = require("./src/utils/errorHandler.js");

// db.sequelize.sync();

// app.use((req, res, next) => {
//   const error = new Error("Resource in not found");
//   error.status = 404;
//   next(error);
// });

// app.use((error, req, res, next) => {
//   handleError(error, res);
// });

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
