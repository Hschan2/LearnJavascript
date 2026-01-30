import express from "express";
import { adminDb } from "../firebase-admin";
import jwt from "jsonwebtoken";
import { API_ERROR_MESSAGE } from "../message";

const router = express.Router();

router.post("/verify-signup-code", async (req, res) => {
  const { email, code } = req.body;
  if (!email || !code)
    return res.status(400).json({ error: API_ERROR_MESSAGE.NEED_EMAIL_CODE });

  try {
    const docRef = adminDb.collection("signUpCodes").doc(email);
    const docSnap = await docRef.get();

    if (!docSnap.exists) {
      return res.status(400).json({ error: API_ERROR_MESSAGE.NOT_CODE });
    }

    const { code: savedCode, expiresAt } = docSnap.data()!;
    if (Date.now() > expiresAt) {
      return res.status(400).json({ error: API_ERROR_MESSAGE.EXPIRED_CODE });
    }

    if (savedCode !== code) {
      return res.status(400).json({ error: API_ERROR_MESSAGE.FALSE_CODE });
    }

    await docRef.delete();

    const token = jwt.sign(
      { email, type: "signup" },
      process.env.JWT_SECRET || "secret",
      { expiresIn: "10m" }
    );

    res.json({ success: true, token });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: API_ERROR_MESSAGE.FAILED_CODE_CHECK });
  }
});

export default router;
