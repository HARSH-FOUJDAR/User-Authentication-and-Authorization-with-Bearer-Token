const express = require("express");
const AuthRouter = require("../controllers/authController");
const Middleware = require("../middlewares/authMiddleware");
const router = express.Router();

router.post("/register", AuthRouter.PostAuth);
router.get("/register", AuthRouter.getpostauth);

router.post("/login", AuthRouter.PostloginUser);
router.get("/login", AuthRouter.getloginUser);

router.get("/profile", Middleware, AuthRouter.getProfile);

// authRoutes.js
router.get("/logout", AuthRouter.logoutUser);

module.exports = router;
