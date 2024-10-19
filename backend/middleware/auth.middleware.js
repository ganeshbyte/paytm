import jwt from "jsonwebtoken";
import { JWT_CONFIG } from "../config.js";

export const authMiddleware = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || authHeader.startWith("Bearer ")) {
    res.status(403).json({
      message: "Unauthorized",
    });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decode = jwt.verify(JWT_CONFIG.JWT_SECRET);

    req.userId = decode.userId;

    next();
  } catch (error) {
    res.status(403).json({
      message: "Authorization Error",
    });
  }
};
