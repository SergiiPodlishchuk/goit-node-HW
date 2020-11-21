const { Router } = require("express");
const usersControllers = require("./users.controllers");
const userRouter = Router();

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
userRouter.get(
  "/user/current",
  usersControllers.authorization,
  usersControllers.getCurrentUser
);
userRouter.patch(
  "/user/:id",
  usersControllers.validateUserId,
  usersControllers.updateSubscribe
);
module.exports = userRouter;
