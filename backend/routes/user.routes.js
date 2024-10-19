import express from "express";
import zod from "zod";
import { User } from "../model/user.model.js";
import jwt from "jsonwebtoken";
import { JWT_CONFIG } from "../config.js";
import bcrypt from "bcrypt";
import { hashPassword, verifyPassword } from "../functions/utility.function.js";
import { authMiddleware } from "../middleware/auth.middleware.js";

const router = express.Router();

const signInSchema = zod.object({
  username: zod.string().email(),
  password: zod.string(),
});

const signUpSchema = zod.object({
  firstName: zod.string(),
  lastName: zod.string().optional(),
  username: zod.string().email(),
  password: zod.string(),
});

router.post("/signin", async (req, res) => {
  const { username, password } = req.body;

  const { success } = signInSchema.safeParse(req.body);

  if (!success) {
    return res.json({
      message: "Email already taken / Incorrect inputs",
    });
  }

  const user = await User.findOne({
    username,
  });

  if (!user) {
    return res.json({
      message: "You have not singup / Account not found",
    });
  }

  const verifyPass = await verifyPassword(password, user.password);

  if (!verifyPass) {
    return res.status(403).json({
      message: "Password is incorrect!",
    });
  }

  const token = jwt.sign(
    {
      firstName: user.firstName,
      username: user.username,
    },
    JWT_CONFIG.JWT_SECRET
  );

  res.json({
    message: "SignIn successfull",
    token: token,
  });
});

router.post("/signup", async (req, res) => {
  const body = req.body;

  const { success } = signUpSchema.safeParse(req.body);

  if (!success) {
    return res.json({
      message: "Email already taken / Incorrect inputs",
    });
  }

  const user = User.findOne({
    username: body.username,
  });

  if (user._id) {
    return res.json({
      message: "Email already taken / Incorrect inputs",
    });
  }

  //generate hash password
  const hashPass = await hashPassword(body.password);

  const newUser = await User.create({
    ...body,
    password: hashPass,
  });

  const token = jwt.sign(
    {
      firstName: newUser.firstName,
      username: newUser.username,
    },
    JWT_CONFIG.JWT_SECRET
  );

  res.json({
    message: "SignUp Successfull",
    token: token,
  });
});

export default router;
