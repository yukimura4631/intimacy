import React from "react";
import MenuCard from "../../components/MenuCard";
import { Link } from "react-router-dom";
import UserNews from "../../components/UserNews";
import menuLogo from "../../assets/TitleLOGO.png"; // メニュー画像のパスを適宜変更
import heroHead from "../../assets/hero-head.png"; // ヒーロー画像 "ヘッドスパ"
import HeadSpa from "../../assets/headUp .png"; // ドライヘッドスパ画像
import FootCare from "../../assets/footUp.png"; // フットケア画像

const menuItems = [
  {
    title: "アロマセラピー",
    description: "厳選オイルで全身を包み込む、極上の癒し体験。",
    image: menuLogo,
    details: [
      { duration: "60分", price: "¥9,000" },
      { duration: "80分", price: "¥12,000" },
      { duration: "100分", price: "¥15,000" },
      { duration: "120分", price: "¥18,000" },
      { duration: "150分", price: "¥21,000" }
    ],
    path: "/menu/aroma"
  },
  {
    title: "ドライヘッドスパ",
    description: "肩・足・ふくらはぎへの集中ケアで、深部からほぐれる。",
    image: HeadSpa,
    details: [
      { duration: "40分", price: "¥5,000" },
      { duration: "60分", price: "¥7,000" },
      { duration: "80分", price: "¥9,000" }
    ],
    path: "/menu/headspa"
  },
  {
    title: "フットケア",
    description: "足の角質ケアで清潔感と爽快感を。短時間でも確かな効果。",
    image: FootCare,
    details: [
      { duration: "15分", price: "¥1,500" },
      { duration: "30分", price: "¥2,500" }
    ],
    path: "/menu/footcare"
  }
];

const Home = () => {
  return (
    <>
      <div className="max-w-screen-xl mx-auto px-4">
        <main>
          <div className="relative h-96 overflow-hidden">
            {
              /* <video
              autoPlay
              muted
              loop
              playsInline
              className="absolute top-0 left-0 w-full h-full object-cover z-0">
              <source src="/videos/sample.mp4" type="video/mp4" />
              Your browser does not support the video tag.
            </video> */
              <img
                src={heroHead}
                className="absolute top-0 left-0 w-full h-full object-cover z-0"
                alt="hero-image"
              ></img>
            }
            <div className="relative z-10 flex items-center justify-center h-full text-white">
              <h1 className="text-4xl md:text-6xl font-bold">

              </h1>
            </div>
          </div>
        </main>
        <section className="py-16">
          <div className="p-4">
            <h2 className="text-3xl font-bold text-center mb-8">お知らせ</h2>
            <UserNews />
          </div>
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-8">メニュー</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {menuItems.map((item) => (
                <Link to={item.path} key={item.title} className="block">
                  <MenuCard
                    title={item.title}
                    description={item.description}
                    image={item.image}
                  />
                </Link>
              ))}
            </div>
          </div>
        </section>
      </div>
    </>
  );
};
export default Home;
