const express = require("express");
const dotenv = require("dotenv");
const DataBase = require("./config/db");

dotenv.config();

const app = express();

// Middleware
app.use(express.json()); // ONLY JSON (Postman)

// Routes
const authRouter = require("./routes/authRoutes");
app.use("/auth", authRouter);

// Health check / Home route
app.get("/", (req, res) => {
  res.status(200).json({
    message: "User Authentication API is running",
  });
});

// DB connect
DataBase();

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log("Server is running on port", port);
});
