import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import { adminDb } from "../../src/firebase-admin";

export default async function handler(req: Request, res: Response) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method Not Allowed" });
  }

  const { email, code } = req.body;
  if (!email || !code) {
    return res.status(400).json({ error: "이메일과 코드가 필요합니다" });
  }

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

    return res.status(200).json({ success: true, token });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "코드 검증 실패" });
  }
}
