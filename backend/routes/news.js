//news.js
const express = require("express");
const router = express.Router();
const mysql = require("mysql2/promise");
const multer = require("multer");
const path = require("path");

// DBコネクションプール
const db = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "password", // ← 必要に応じて修正してね
  database: "intimacy",
});

// 認証ミドルウェア
const { isAuthenticated } = require("../middleware/auth"); // ← パス要確認

// アップロード設定
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/uploads/");
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + path.extname(file.originalname));
  },
});
const upload = multer({ storage });

// 投稿ルートを守る！
router.post("/", isAuthenticated, upload.single("image"), async (req, res) => {
  const { title, content } = req.body;
  const imagePath = req.file ? `/uploads/${req.file.filename}` : null;

  if (!title || !content) {
    return res.status(400).json({ message: "タイトルと内容は必須です" });
  }

  try {
    const [result] = await db.query(
      "INSERT INTO news (title, content, image_path) VALUES (?, ?, ?)",
      [title, content, imagePath]
    );

    res.status(201).json({
      id: result.insertId,
      title,
      content,
      image_url: imagePath,
      created_at: new Date(),
    });
  } catch (err) {
    console.error("お知らせ追加エラー:", err);
    res.status(500).json({ message: "サーバーエラー" });
  }
});

// お知らせ一覧（GET）
router.get("/", async (req, res) => {
  try {
    const [rows] = await db.query(
      "SELECT * FROM news ORDER BY created_at DESC"
    );

    // image_path を image_url に変換
    const newsWithImage = rows.map((item) => ({
      ...item,
      image_url: item.image_path
        ? `/uploads/${path.basename(item.image_path)}`
        : null,
    }));

    res.json(newsWithImage);
  } catch (err) {
    console.error("お知らせ一覧取得エラー:", err);
    res.status(500).json({ message: "サーバーエラー" });
  }
});

// 新しいお知らせを追加（POST）
router.post("/", upload.single("image"), async (req, res) => {
  const { title, content } = req.body;
  const imagePath = req.file ? `/uploads/${req.file.filename}` : null;

  if (!title || !content) {
    return res.status(400).json({ message: "タイトルと内容は必須です" });
  }

  try {
    const [result] = await db.query(
      "INSERT INTO news (title, content, image_path) VALUES (?, ?, ?)",
      [title, content, imagePath]
    );

    res.status(201).json({
      id: result.insertId,
      title,
      content,
      image_url: imagePath,
      created_at: new Date(),
    });
  } catch (err) {
    console.error("お知らせ追加エラー:", err);
    res.status(500).json({ message: "サーバーエラー" });
  }
});

// 公開フォルダ
router.use("/uploads", express.static("public/uploads"));

// お知らせの更新（PUT）
router.put("/:id", upload.single("image"), async (req, res) => {
  const { id } = req.params;
  const { title, content } = req.body;
  const imagePath = req.file ? `/uploads/${req.file.filename}` : null;

  if (!title || !content) {
    return res.status(400).json({ message: "タイトルと内容は必須です" });
  }

  try {
    if (imagePath) {
      await db.query(
        "UPDATE news SET title = ?, content = ?, image_path = ? WHERE id = ?",
        [title, content, imagePath, id]
      );
    } else {
      await db.query("UPDATE news SET title = ?, content = ? WHERE id = ?", [
        title,
        content,
        id,
      ]);
    }

    res.status(200).json({ message: "更新しました" });
  } catch (err) {
    console.error("お知らせ更新エラー:", err);
    res.status(500).json({ message: "サーバーエラー" });
  }
});

// お知らせを削除（DELETE）
router.delete("/:id", async (req, res) => {
  const { id } = req.params;

  try {
    await db.query("DELETE FROM news WHERE id = ?", [id]);
    res.sendStatus(204);
  } catch (err) {
    console.error("削除エラー:", err);
    res.status(500).json({ message: "削除に失敗しました" });
  }
});

module.exports = router;
