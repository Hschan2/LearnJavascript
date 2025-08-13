import express from "express";
import { adminDb } from "../firebase-admin";
import jwt from "jsonwebtoken";

const router = express.Router();

router.post("/verify-code", async (req, res) => {
  const { email, code } = req.body;
  if (!email || !code)
    return res.status(400).json({ error: "이메일과 코드가 필요합니다" });

  try {
    const docRef = adminDb.collection("resetCodes").doc(email);
    const docSnap = await docRef.get();

    if (!docSnap.exists) {
      return res.status(400).json({ error: "코드가 없습니다" });
    }

    const { code: savedCode, expiresAt } = docSnap.data()!;
    if (Date.now() > expiresAt) {
      return res.status(400).json({ error: "코드가 만료되었습니다" });
    }

    if (savedCode !== code) {
      return res.status(400).json({ error: "코드가 틀립니다" });
    }

    await docRef.delete();

    const token = jwt.sign({ email }, process.env.JWT_SECRET || "secret", {
      expiresIn: "10m",
    });

    res.json({ success: true, token });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "코드 검증 실패" });
  }
});

export default router;
