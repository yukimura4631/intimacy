// backend/routes/admin.js に追加
const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const db = require("../db"); // DB接続プール（server.jsで使ってたやつ）
const { isAuthenticated } = require("../middleware/auth"); // これ追加！

// 管理者新規登録
router.post("/register", async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password)
    return res.status(400).json({ message: "必須項目が足りません" });

  try {
    // 同一ユーザー名の確認
    const [existing] = await db.query(
      "SELECT * FROM admin_users WHERE username = ?",
      [username]
    );
    if (existing.length > 0) {
      return res
        .status(409)
        .json({ message: "このユーザー名はすでに使われています" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    await db.query(
      "INSERT INTO admin_users (username, password_hash) VALUES (?, ?)",
      [username, hashedPassword]
    );
    res.status(201).json({ message: "登録完了" });
  } catch (err) {
    console.error("登録エラー:", err);
    res.status(500).json({ message: "サーバーエラー" });
  }
});

// DELETE /api/admin/users/:id
router.delete("/users/:id", isAuthenticated, async (req, res) => {
  const { id } = req.params;

  try {
    // 管理者が自分自身を削除しようとしている場合は防ぐ（任意）
    if (req.session.admin.id === parseInt(id)) {
      return res.status(400).json({ message: "自分自身は削除できません" });
    }

    const [result] = await db.query("DELETE FROM admin_users WHERE id = ?", [
      id,
    ]);
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "管理者が見つかりません" });
    }

    res.status(200).json({ message: "削除しました" });
  } catch (err) {
    console.error("管理者削除エラー:", err);
    res.status(500).json({ message: "サーバーエラー" });
  }
});

// 管理者一覧取得
router.get("/users", isAuthenticated, async (req, res) => {
  try {
    const [rows] = await db.query("SELECT * FROM admin_users");
    res.json(rows);
  } catch (err) {
    console.error("管理者一覧取得エラー:", err);
    res.status(500).json({ message: "取得失敗" });
  }
});

module.exports = router;
