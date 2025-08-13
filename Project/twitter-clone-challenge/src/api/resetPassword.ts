import express from "express";
import jwt from "jsonwebtoken";
import { authAdmin } from "../firebase-admin";

const router = express.Router();

router.post("/reset-password", async (req, res) => {
  const { token, newPassword } = req.body;
  if (!token || !newPassword) {
    return res.status(400).json({ error: "토큰과 새 비밀번호가 필요합니다" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || "secret") as {
      email: string;
    };
    const email = decoded.email;

    const user = await authAdmin.getUserByEmail(email);

    await authAdmin.updateUser(user.uid, { password: newPassword });

    res.json({ success: true });
  } catch (err) {
    console.error(err);
    res.status(401).json({ error: "토큰이 유효하지 않거나 만료되었습니다" });
  }
});

export default router;
