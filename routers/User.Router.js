const { RegisterUser, loginUser, GetAllUser, UpdateUser, GetProfile } = require("../controllers/User.Controller");
const express = require("express");
const { Authentication } = require("../middlewares/Authenitcation");
const UserRouter = express.Router();

// User registration and login routes
UserRouter.post("/auth/register", RegisterUser);
UserRouter.post("/auth/login", loginUser);

// User data routes with authentication
UserRouter.get("/user", Authentication, GetAllUser);
UserRouter.get("/profile", Authentication, GetProfile);
UserRouter.patch("/auth/user-update/:id", Authentication, UpdateUser);

module.exports = { UserRouter };
