// tailwind.config.js
module.exports = {
  content: ["./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      fontFamily: {
        serifjp: ['"Noto Serif JP"', 'serif'], // ベースフォントとして
        sansjp: ['"Noto Sans JP"', 'sans-serif'], // 優しい印象で要所に◎
        gothic: ['"Zen Kaku Gothic New"', 'sans-serif'], // モダンで温かみ
        tetsubin: ['"Tetsubin Gothic"', 'sans-serif'], // キャッチなどのアクセント用（ローカル/自前読み込み必要）
      },
      backgroundImage: {
        'main-body': "url('./assets/mainBG.png')",
      },
    },
  },
  plugins: [],
};