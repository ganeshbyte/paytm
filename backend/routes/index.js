import express from "express";
import userRouter from "./user.routes.js";
import accountRouter from "./account.routes.js";

const mainRouter = express.Router();

mainRouter.use("/user", userRouter);
mainRouter.use("/account", accountRouter);

export default mainRouter;
