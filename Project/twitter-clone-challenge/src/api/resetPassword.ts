import express from "express";
import jwt from "jsonwebtoken";
import { authAdmin } from "../firebase-admin";
import { messages } from "../message";

const router = express.Router();

router.post("/reset-password", async (req, res) => {
  const { token, newPassword } = req.body;
  if (!token || !newPassword) {
    return res.status(400).json({ error: messages.apiError.notTokenNewPassword });
  }

  if (!process.env.JWT_SECRET) {
    throw new Error(messages.apiError.noJwtSecret);
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET) as {
      email: string;
    };
    const email = decoded.email;

    if (newPassword.length < 6) {
      return res.status(400).json({ error: messages.apiError.shortPasswordLength });
    }

    const user = await authAdmin.getUserByEmail(email);

    await authAdmin.updateUser(user.uid, { password: newPassword });

    res.json({ success: true });
  } catch (err) {
    console.error(err);
    res.status(401).json({ error: messages.apiError.expiredToken });
  }
});

export default router;
