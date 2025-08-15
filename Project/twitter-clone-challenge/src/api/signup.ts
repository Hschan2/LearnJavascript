import express from "express";
import jwt from "jsonwebtoken";
import { AuthService } from "../features/auth/hooks/authService";

const router = express.Router();

router.post("/signup", async (req, res) => {
  const { name, password, token } = req.body;
  if (!name || !password || !token) {
    return res.status(400).json({ error: "이름, 비밀번호, 토큰이 필요합니다" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || "secret") as {
      email: string;
      type: string;
    };

    if (decoded.type !== "signup") {
      return res.status(400).json({ error: "잘못된 토큰입니다" });
    }

    const email = decoded.email;
    await AuthService.signUp(name, email, password);

    res.json({ success: true });
  } catch (err) {
    console.error(err);
    res.status(400).json({ error: "회원가입 실패" });
  }
});

export default router;
