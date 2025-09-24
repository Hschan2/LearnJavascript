import { Request, Response } from "express";
import nodemailer from "nodemailer";
import { adminDb, authAdmin } from "../../src/firebase-admin";

export default async function handler(req: Request, res: Response) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method Not Allowed" });
  }

  const { email } = req.body;
  if (!email) return res.status(400).json({ error: "이메일이 필요합니다" });

  try {
    const user = await authAdmin.getUserByEmail(email).catch(() => null);
    if (!user) {
      return res.status(404).json({ error: "등록된 이메일이 없습니다." });
    }

    const code = Math.floor(100000 + Math.random() * 900000).toString();
    const expirationTime = Date.now() + 5 * 60 * 1000;

    await adminDb.collection("resetCodes").doc(email).set({
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
      subject: "비밀번호 재설정 코드",
      text: `인증 코드: ${code}\n5분 내 입력하세요.`,
    });

    return res.status(200).json({ success: true });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "코드 발송 실패" });
  }
}
