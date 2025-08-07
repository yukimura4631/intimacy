//route/auth.js
const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const mysql = require("mysql2/promise");

const db = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "password",
  database: "intimacy",
});

// 新規登録（登録画面用）
router.post("/register", async (req, res) => {
  const { username, password } = req.body;
  try {
    const hashed = await bcrypt.hash(password, 10);
    await db.query(
      "INSERT INTO admin_users (username, password_hash) VALUES (?, ?)",
      [username, hashed]
    );
    res.status(201).json({ message: "登録成功" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "登録エラー" });
  }
});

// ログイン
router.post("/login", async (req, res) => {
  const { username, password } = req.body;
  try {
    const [users] = await db.query(
      "SELECT * FROM admin_users WHERE username = ?",
      [username]
    );
    const admin = users[0];
    if (!admin)
      return res.status(401).json({ message: "ユーザーが見つかりません" });

    const match = await bcrypt.compare(password, admin.password_hash);
    if (!match)
      return res.status(401).json({ message: "パスワードが違います" });

    req.session.admin = { id: admin.id, username: admin.username };
    console.log("セッション保存前:", req.session);
    req.session.save(() => {
      res.json({ message: "ログイン成功", admin: req.session.admin });
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "サーバーエラー" });
  }
});

// ログアウト
router.post("/logout", (req, res) => {
  req.session.destroy((err) => {
    if (err)
      return res.status(500).json({ message: "ログアウトに失敗しました" });
    res.clearCookie("connect.sid");
    res.json({ message: "ログアウトしました" });
  });
});

// 自分情報の確認
router.get("/me", (req, res) => {
  if (req.session && req.session.admin) {
    res.json({ admin: req.session.admin });
  } else {
    res.status(401).json({ message: "未ログインです" });
  }
});

module.exports = router;
