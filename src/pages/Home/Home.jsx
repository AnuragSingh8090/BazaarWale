import "./Home.css";
import { GrabBestDeals, ShopFromCategories, TopElectronicBrands, HomeEssentials } from "../../components/ShopCategory/ShopCategory";
import ScrollToTop from "../../components/ScrollToTop/ScrollToTop";
import SubscribeEmail from "../../components/SubscribeEmail/SubscribeEmail";
import Slider from "../../components/Slider/Slider";
const Home = () => {
  const grabBestDeals = [
    {
      id: 1,
      image: "./productImages/iphone16.png",
      discount: "17%",
      name: "iPhone 16 Pro Max",
      price: "1,00,000",
      originalPrice: "1,20,000",
      saveAmount: "20,000",
      link: "/products"
    },
    {
      id: 2,
      image: "./productImages/earbuds.png",
      discount: "17%",
      name: "MacBook Pro M3",
      price: "1,50,000",
      originalPrice: "1,80,000",
      saveAmount: "30,000",
      link: "/products"
    },
    {
      id: 3,
      image: "./productImages/game-controller.png",
      discount: "25%",
      name: "AirPods Pro 2",
      price: "18,000",
      originalPrice: "24,000",
      saveAmount: "6,000",
      link: "/products"
    },
    {
      id: 4,
      image: "./productImages/gaming-headphones.png",
      discount: "18%",
      name: "Samsung Galaxy S24 Ultra",
      price: "90,000",
      originalPrice: "1,10,000",
      saveAmount: "20,000",
      link: "/products"
    },
    {
      id: 5,
      image: "./productImages/smart-watch.png",
      discount: "24%",
      name: "iPad Pro 13-inch",
      price: "80,000",
      originalPrice: "1,05,000",
      saveAmount: "25,000",
      link: "/products"
    },
    {
      id: 6,
      image: "./productImages/iphone16.png",
      discount: "30%",
      name: "Apple Watch Series 9",
      price: "35,000",
      originalPrice: "50,000",
      saveAmount: "15,000",
      link: "/products"
    },
    {
      id: 7,
      image: "./productImages/iphone16.png",
      discount: "42%",
      name: "Sony WH-1000XM5",
      price: "22,000",
      originalPrice: "38,000",
      saveAmount: "16,000",
      link: "/products"
    },
    {
      id: 8,
      image: "./productImages/iphone16.png",
      discount: "14%",
      name: "Canon EOS R6 Mark II",
      price: "1,80,000",
      originalPrice: "2,10,000",
      saveAmount: "30,000",
      link: "/products"
    },
    {
      id: 9,
      image: "./productImages/iphone16.png",
      discount: "33%",
      name: "JBL Flip 6 Bluetooth Speaker",
      price: "8,000",
      originalPrice: "12,000",
      saveAmount: "4,000",
      link: "/products"
    },
    {
      id: 10,
      image: "./productImages/iphone16.png",
      discount: "15%",
      name: "PlayStation 5 Pro",
      price: "55,000",
      originalPrice: "65,000",
      saveAmount: "10,000",
      link: "/products"
    },
    {
      id: 11,
      image: "./productImages/iphone16.png",
      discount: "25%",
      name: "Dell XPS 15",
      price: "1,20,000",
      originalPrice: "1,60,000",
      saveAmount: "40,000",
      link: "/products"
    },
    {
      id: 12,
      image: "./productImages/iphone16.png",
      discount: "20%",
      name: "Samsung Galaxy Tab S9",
      price: "60,000",
      originalPrice: "75,000",
      saveAmount: "15,000",
      link: "/products"
    }
  ];

  const topElectronicBrands = [
    {
      id: 1,
      logo: "./brand-logo/apple-logo.svg",
      image: "./productImages/iphone16.png",
      name: "IPHONE",
      discount: '10%',
      bgcolor: '#d0d0d0',
      bgdark: '#9d9d9d',
      textcolor: 'white',
      link: "/products"
    },
    {
      id: 2,
      logo: "./brand-logo/samsung-logo.svg",
      image: "./productImages/samsung-s25ultra.png",
      name: "SAMSUNG",
      discount: '13%',
      bgcolor: '#e2e6fd',
      bgdark: '#b6c0fa',
      textcolor: 'black',
      link: "/products"
    },
    {
      id: 3,
      logo: "./brand-logo/iqoo-logo.svg",
      image: "./productImages/iqoo.png",
      name: "IQOO",
      discount: '22%',
      bgcolor: '#fee7b0',
      bgdark: '#fcd474',
      textcolor: 'black',
      link: "/products"
    },
    {
      id: 4,
      logo: "./brand-logo/motorola-logo.svg",
      image: "./productImages/motorola.png",
      name: "MOTOROLA",
      discount: '18%',
      bgcolor: '#c3ddfc',
      bgdark: '#87bbf9',
      textcolor: 'black',
      link: "/products"
    },
    {
      id: 5,
      logo: "./brand-logo/oneplus-logo.svg",
      image: "./productImages/oneplus.png",
      name: "ONE PLUS",
      discount: '14%',
      bgcolor: '#ffcbcb',
      bgdark: '#ffa9a9',
      textcolor: 'black',
      link: "/products"
    },
    {
      id: 6,
      logo: "./brand-logo/oppo-logo.svg",
      image: "./productImages/oppo.png",
      name: "OPPO",
      discount: '22%',
      bgcolor: '#cfffe0',
      bgdark: '#8bd0a4',
      textcolor: 'black',
      link: "/products"
    },
    {
      id: 7,
      logo: "./brand-logo/realme-logo.svg",
      image: "./productImages/realme.png",
      name: "REALME",
      discount: '10%',
      bgcolor: '#fef3cc',
      bgdark: '#f6de8d',
      textcolor: 'black',
      link: "/products"
    },
    {
      id: 8,
      logo: "./brand-logo/vivo-logo.svg",
      image: "./productImages/vivo.png",
      name: "VIVO",
      discount: '16%',
      bgcolor: '#e0daf8',
      bgdark: '#c9bcff',
      textcolor: 'black',
      link: "/products"
    },
    {
      id: 9,
      logo: "./brand-logo/xiaomi-logo.svg",
      image: "./productImages/xiaomi.png",
      name: "XIAOMI",
      discount: '19%',
      bgcolor: '#feecde',
      bgdark: '#fdcfaf',
      textcolor: 'black',
      link: "/products"
    },

  ];


  return (
    <div className="bg-white p-[12px] xl:p-[22px]">
      <ScrollToTop />
      <Slider />
      <GrabBestDeals products={grabBestDeals} />
      <ShopFromCategories products={grabBestDeals} />
      <TopElectronicBrands products={topElectronicBrands} />
      <HomeEssentials products={grabBestDeals} />
      <SubscribeEmail />
    </div>
  );
};

export default Home;
