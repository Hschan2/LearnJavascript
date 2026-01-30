import express from "express";
import jwt from "jsonwebtoken";
import { AuthService } from "../features/auth/hooks/authService";
import { API_ERROR_MESSAGE } from "../message";

const router = express.Router();

router.post("/signup", async (req, res) => {
  const { name, password, token } = req.body;
  if (!name || !password || !token) {
    return res.status(400).json({ error: API_ERROR_MESSAGE.NO_EMAIL_PASSWORD_TOKEN });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || "secret") as {
      email: string;
      type: string;
    };

    if (decoded.type !== "signup") {
      return res.status(400).json({ error: API_ERROR_MESSAGE.FALSE_TOKEN });
    }

    const email = decoded.email;
    await AuthService.signUp(name, email, password);

    res.json({ success: true });
  } catch (err) {
    console.error(err);
    res.status(400).json({ error: API_ERROR_MESSAGE.FAILED_SIGN });
  }
});

export default router;
