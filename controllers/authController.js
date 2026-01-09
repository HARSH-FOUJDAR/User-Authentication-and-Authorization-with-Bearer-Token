const UserScema = require("../models/User");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const User = require("../models/User");

exports.getpostauth = (req, res) => {
  res.render("register");
};

exports.PostAuth = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({
      username,
      email,
      password: hashedPassword,
    });

    res.redirect("/auth/login");
  } catch (error) {
    console.log("Register Error:", error);
    res.status(500).send("Error User Register pl again the different email and password");
  }
};

//render login page

exports.getloginUser = (req, res) => {
  res.render("login");
};

exports.PostloginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    //find yser nad email
    const user = await User.findOne({ email });
    if (!user) {
      return res.send("Invelid email");
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.send("Invelid password");
    }

    //genetare Jwt
    const token = jwt.sign(
      {
        userId: user._id,
        email: user.email,
      },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    // send the  cookies
    res.cookie("token", token, { httpOnly: true });
    res.redirect("/auth/profile");
  } catch (error) {
    res.status(500).send("Error Login in user");
    console.log(error);
  }
};

exports.getProfile = (req, res) => {
  res.render("profile", { user: req.user });
};

// authController.js
exports.logoutUser = (req, res) => {
  res.clearCookie("token");
  res.redirect("/auth/login");
};


exports.gethome=(req,res)=>{
  res.redirect("/auth/login")
}