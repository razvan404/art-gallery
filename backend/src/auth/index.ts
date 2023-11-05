import express, { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import userService from "../models/user/service";
import { User } from "../models/user";

export const authRouter = express.Router();
const jwtSecret = process.env.JWT_SECRET;

const createToken = (user: User) => {
  return jwt.sign(
    { id: user.id, username: user.username, profileImage: user.profileImage },
    jwtSecret ?? "",
    { expiresIn: "3h" }
  );
};

export const authenticateToken = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (token == null) return res.sendStatus(401);

  jwt.verify(token, process.env.JWT_SECRET as string, (err: any, user: any) => {
    if (err) {
      return res.sendStatus(403);
    }
    (req as any).user = user;
    next();
  });
};

export const userFromAuthenticatedRequest = (req: Request): User => {
  return (req as any).user;
};

// POST auth/login
authRouter.post("/login", async (req, res) => {
  try {
    const { usernameOrEmail, password } = req.body;
    console.log(usernameOrEmail, password);
    const user = await userService.findByUsernameOrMail(usernameOrEmail);
    console.log(user);
    if (!user) {
      return res.sendStatus(404);
    }
    if (!userService.checkPassword(user, password)) {
      return res.sendStatus(401);
    }
    const token = createToken(user);
    const { password: _, ...userResponse } = user;
    console.log(userResponse);
    res.status(200).send({ token, user: userResponse });
  } catch (err: any) {
    res.status(500).send(err.message);
  }
});

// POST auth/register
authRouter.post("/register", async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const user = await userService.createUser(username, email, password);
    const token = createToken(user);
    res.status(200).send({ token, user });
  } catch (err: any) {
    res.status(500).send(err.message);
  }
});
