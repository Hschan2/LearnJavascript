import express from "express";
import jwt from "jsonwebtoken";
import { authAdmin } from "../firebase-admin";
import { API_ERROR_MESSAGE } from "../message";

const router = express.Router();

router.post("/reset-password", async (req, res) => {
  const { token, newPassword } = req.body;
  if (!token || !newPassword) {
    return res.status(400).json({ error: API_ERROR_MESSAGE.NOT_TOKEN_NEW_PASSWORD });
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
    res.status(401).json({ error: API_ERROR_MESSAGE.EXPIRED_TOKEN });
  }
});

export default router;
