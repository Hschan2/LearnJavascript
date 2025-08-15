import express from "express";
import nodemailer from "nodemailer";
import { adminDb, authAdmin } from "../firebase-admin";

const router = express.Router();

router.post("/send-signup-code", async (req, res) => {
  const { email } = req.body;
  if (!email) return res.status(400).json({ error: "이메일이 필요합니다" });

  try {
    const existingUser = await authAdmin
      .getUserByEmail(email)
      .catch(() => null);
    if (existingUser) {
      return res.status(400).json({ error: "이미 가입된 이메일입니다." });
    }

    const code = Math.floor(100000 + Math.random() * 900000).toString();
    const expirationTime = Date.now() + 5 * 60 * 1000; // 5분

    await adminDb.collection("signUpCodes").doc(email).set({
      code,
      expiresAt: expirationTime,
    });

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    await transporter.sendMail({
      from: `"관리자" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: "회원가입 인증 코드",
      text: `인증 코드: ${code}\n5분 내 입력하세요.`,
    });

    res.json({ success: true });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "인증 코드 발송 실패" });
  }
});

export default router;
