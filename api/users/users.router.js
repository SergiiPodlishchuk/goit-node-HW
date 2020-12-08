const { Router } = require("express");
const usersControllers = require("./users.controllers");
const userRouter = Router();
const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
  destination: "tmp",
  filename: function (req, file, cb) {
    const ext = path.parse(file.originalname).ext;
    cb(null, Date.now() + ext);
  },
});

userRouter.post(
  "/auth/register",
  usersControllers.validateUser,
  usersControllers.registerUser
);
userRouter.post(
  "/auth/login",
  usersControllers.validateUser,
  usersControllers.loginUser
);
userRouter.post(
  "/auth/logout",
  usersControllers.authorization,
  usersControllers.logoutUser
);
userRouter.get("/auth/verify/:verificationToken", usersControllers.verifyEmail);
userRouter.get(
  "/user/current",
  usersControllers.authorization,
  usersControllers.getCurrentUser
);

userRouter.patch(
  "/user/avatar",
  usersControllers.authorization,
  multer({ storage: storage }).single("avatar"),
  usersControllers.updateAvatar
);

userRouter.patch(
  "/user/:id",
  usersControllers.validateUserId,
  usersControllers.validateSubscribe,
  usersControllers.updateSubscribe
);

module.exports = userRouter;
