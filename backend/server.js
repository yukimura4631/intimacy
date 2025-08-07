// server.js
require("dotenv").config({ path: "./backend/.env" });const express = require("express");
const cors = require("cors");
const app = express();
const camelcaseKeys = require("camelcase-keys").default;
const mysql = require("mysql2/promise");
const newsRoutes = require("./routes/news"); // 追加！
const session = require("express-session");
const MySQLStore = require("express-mysql-session")(session);
const { isAuthenticated } = require("./middleware/auth"); // これ追加！
const authRoutes = require("./routes/auth");
const adminRoutes = require("./routes/admin"); // 管理者用のルート
const PORT = process.env.PORT || 4000;
const HOST = process.env.HOST || '0.0.0.0';

// MySQLセッションストアの設定
const sessionStore = new MySQLStore({
  host: "localhost",
  user: "root",
  password: "password",
  database: "intimacy",
});
// MySQLの接続プールを作成
const db = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "password", // ← 環境に合わせて
  database: "intimacy",
});

app.use(cors({
  origin: process.env.FRONTEND_ORIGIN,
  credentials: true,
}));

app.use(express.json()); // JSONのリクエストボディを扱えるように
app.use(
  session({
    secret: "your-secret-key", // セキュアな文字列に変えてね
    resave: false,
    saveUninitialized: false,
    store: sessionStore,
    cookie: {
      httpOnly: true,
      secure: false, // HTTPS必須
      sameSite: "lax",
      maxAge: 1000 * 60 * 60 * 2,
    }
  })
);
app.use("/api/auth", authRoutes);
app.use("/api/admin", adminRoutes); // 管理者用のルートを追加
app.use("/api/news", newsRoutes); // お知らせのルートを追加
app.use("/uploads", express.static("public/uploads")); // 画像アップロード用の静的ファイルサーバー

// GET 予約一覧のレスポンスをキャメルケースに
app.get("/api/reservations", async (req, res) => {
  try {
    const [rows] = await db.query(
      "SELECT * FROM reservations ORDER BY date, time"
    );
    res.json(camelcaseKeys(rows));
  } catch (err) {
    console.error("予約一覧取得エラー:", err);
    res.status(500).json({ message: "サーバーエラー" });
  }
});

// ✅ POST 新しい予約を追加
app.post("/api/reservations", async (req, res) => {
  const { menu, date, time, therapist, customerName, phoneNumber, note } =
    req.body;
  const formattedDate = new Date(date).toISOString().split("T")[0];
  // const reservationDate = `${formattedDate} ${time}:00`; // 例: '2025-06-18 16:00:00'

  try {
    const [result] = await db.query(
      "INSERT INTO reservations (menu, date, time, therapist, customer_name, phone_number, note) VALUES (?, ?, ?, ?, ?, ?, ?)",
      [menu, formattedDate, time, therapist, customerName, phoneNumber, note]
    );

    res.status(200).json({
      id: result.insertId,
      menu,
      date,
      time,
      therapist,
      customerName,
      phoneNumber,
      note,
    });
  } catch (err) {
    console.error("新規予約エラー:", err);
    res.status(500).json({ message: "サーバーエラー" });
  }
});

app.put("/api/reservations/:id", isAuthenticated, async (req, res) => {
  const { id } = req.params;
  const { menu, date, time, therapist, customerName, phoneNumber, note } =
    req.body;

  try {
    await db.query(
      "UPDATE reservations SET menu=?, date=?, time=?, therapist=?, customer_name=?, phone_number=?, note=? WHERE id=?",
      [menu, date, time, therapist, customerName, phoneNumber, note, id]
    );

    res.status(200).json({
      id,
      menu,
      date,
      time,
      therapist,
      customerName,
      phoneNumber,
      note,
    });
  } catch (err) {
    console.error("予約更新エラー:", err);
    res.status(500).json({ message: "サーバーエラー" });
  }
});

// DELETE 予約削除
app.delete("/api/reservations/:id", isAuthenticated, async (req, res) => {
  const { id } = req.params;

  try {
    await db.query("DELETE FROM reservations WHERE id = ?", [id]);

    res.status(200).json({ id });
  } catch (err) {
    console.error("予約削除エラー:", err);
    res.status(500).json({ message: "サーバーエラー" });
  }
});

app.listen(PORT, HOST, () => {
  console.log(`🚀 サーバーが ${HOST}:${PORT} で起動しました（CORS: ${process.env.FRONTEND_ORIGIN}）`);
});

