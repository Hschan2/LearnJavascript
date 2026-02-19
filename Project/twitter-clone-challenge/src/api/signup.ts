import express from "express";
import jwt from "jsonwebtoken";
import { AuthService } from "../features/auth/hooks/authService";
import { messages } from "../message";

const router = express.Router();

router.post("/signup", async (req, res) => {
  const { name, password, token } = req.body;
  if (!name || !password || !token) {
    return res.status(400).json({ error: messages.apiError.noEmailPasswordToken });
  }

  try {
    if (!process.env.JWT_SECRET) {
      throw new Error(messages.apiError.noJwtSecret);
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET) as {
      email: string;
      type: string;
    };

    if (decoded.type !== "signup") {
      return res.status(400).json({ error: messages.apiError.falseToken });
    }

    const email = decoded.email;
    await AuthService.signUp(name, email, password);

    res.json({ success: true });
  } catch (err) {
    console.error(err);
    res.status(400).json({ error: messages.apiError.failedSign });
  }
});

export default router;
