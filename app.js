const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");

const DataBase = require("./config/db");
const dotenv = require("dotenv");
dotenv.config();

const app = express();
app.use(cookieParser());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "pages"));
app.use(express.static(path.join(__dirname, "public")));

// Routes
const authRouter = require("./routes/authRoutes");
app.use("/auth", authRouter); // important: prefix /auth

// DB connect
DataBase();

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log("Server is running on port", port);
});
