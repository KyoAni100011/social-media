import express from "express";
import { Login, Register, updateUser } from "../controllers/userController.js";

const userRouter = express.Router();

userRouter.post("/login", Login);
userRouter.post("/register", Register);
userRouter.post("/update", updateUser);

export default userRouter;
