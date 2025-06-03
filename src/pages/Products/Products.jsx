import React, { useState, useMemo } from "react";
import { ChevronDown, Grid, List, ShoppingCart, Star } from "lucide-react";
import { updateCart  } from "../../redux/userSlice";

import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { sucessToast, warnToast } from "../../components/Toasters/Toasters";

const Projects = () => {
  const [selectedCategories, setSelectedCategories] = useState(["Fashion"]);
  const [priceRange, setPriceRange] = useState([0, 60000]);
  const [selectedRatings, setSelectedRatings] = useState([]);
  const [sortBy, setSortBy] = useState("Name, A To Z");
  const [viewMode, setViewMode] = useState("grid");
  const [cart, setCart] = useState([]);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("All");

  const dispatch = useDispatch()
  const isLoggedin = useSelector((state)=> state.login.isLoggedin)
  const navigate = useNavigate(

  )

  const handleAddToCart = () => {
    if(isLoggedin)
    {
      dispatch(updateCart(product))
      sucessToast('Product Added to Cart')
    }
    else{
      navigate('/login');
       warnToast('Please Login First') 
    }

  }

  const products = [
    {
      id: 1,
      name: "Men Opaque Casual Shirt",
      brand: "CLAFOUTIS",
      image:
        "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=300&h=400&fit=crop",
      originalPrice: 1650.0,
      salePrice: 1450.0,
      discount: 12,
      rating: 4,
      category: "Fashion",
    },
    {
      id: 2,
      name: "Men's Polo T-Shirt Cotton Blend",
      brand: "POLO REPUBLIC",
      image:
        "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=300&h=400&fit=crop",
      originalPrice: 999.0,
      salePrice: 699.0,
      discount: 30,
      rating: 4.2,
      category: "Fashion",
    },
    {
      id: 3,
      name: "Men's Denim Jeans Slim Fit",
      brand: "LEVIS",
      image:
        "https://images.unsplash.com/photo-1542272604-787c3835535d?w=300&h=400&fit=crop",
      originalPrice: 2999.0,
      salePrice: 2399.0,
      discount: 20,
      rating: 4.5,
      category: "Fashion",
    },
    {
      id: 4,
      name: "Men's Formal White Shirt",
      brand: "VAN HEUSEN",
      image:
        "https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?w=300&h=400&fit=crop",
      originalPrice: 1799.0,
      salePrice: 1439.0,
      discount: 20,
      rating: 4.3,
      category: "Fashion",
    },

    // Fashion - Women's Clothing
    {
      id: 5,
      name: "Women's Ethnic Kurti",
      brand: "AURELIA",
      image:
        "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=300&h=400&fit=crop",
      originalPrice: 1299.0,
      salePrice: 779.0,
      discount: 40,
      rating: 4.1,
      category: "Fashion",
    },
    {
      id: 6,
      name: "Women's Cotton T-Shirt",
      brand: "H&M",
      image:
        "https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=300&h=400&fit=crop",
      originalPrice: 799.0,
      salePrice: 599.0,
      discount: 25,
      rating: 4.0,
      category: "Fashion",
    },
    {
      id: 7,
      name: "Women's Denim Jacket",
      brand: "ZARA",
      image:
        "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=300&h=400&fit=crop",
      originalPrice: 2499.0,
      salePrice: 1999.0,
      discount: 20,
      rating: 4.4,
      category: "Fashion",
    },

    // T-Shirts
    {
      id: 8,
      name: "Unisex Graphic Print T-Shirt",
      brand: "BEWAKOOF",
      image:
        "https://images.unsplash.com/photo-1583743814966-8936f37f82ef?w=300&h=400&fit=crop",
      originalPrice: 699.0,
      salePrice: 419.0,
      discount: 40,
      rating: 4.2,
      category: "T-Shirts",
    },
    {
      id: 9,
      name: "Plain Black Cotton T-Shirt",
      brand: "DECATHLON",
      image:
        "https://images.unsplash.com/photo-1571945153237-4929e783af4a?w=300&h=400&fit=crop",
      originalPrice: 499.0,
      salePrice: 349.0,
      discount: 30,
      rating: 4.1,
      category: "T-Shirts",
    },
    {
      id: 10,
      name: "Oversized Vintage T-Shirt",
      brand: "URBAN OUTFITTERS",
      image:
        "https://images.unsplash.com/photo-1562157873-818bc0726f68?w=300&h=400&fit=crop",
      originalPrice: 1299.0,
      salePrice: 909.0,
      discount: 30,
      rating: 4.3,
      category: "T-Shirts",
    },

    // Baby Clothing
    {
      id: 11,
      name: "Baby Cotton Onesie Set (Pack of 3)",
      brand: "CARTER'S",
      image:
        "https://images.unsplash.com/photo-1522771930-78848d9293e8?w=300&h=400&fit=crop",
      originalPrice: 1299.0,
      salePrice: 899.0,
      discount: 31,
      rating: 4.6,
      category: "Baby Clothing",
    },
    {
      id: 12,
      name: "Baby Romper Jumpsuit",
      brand: "MOTHERCARE",
      image:
        "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=300&h=400&fit=crop",
      originalPrice: 899.0,
      salePrice: 629.0,
      discount: 30,
      rating: 4.4,
      category: "Baby Clothing",
    },
    {
      id: 13,
      name: "Baby Sleepwear Pajama Set",
      brand: "CHICCO",
      image:
        "https://images.unsplash.com/photo-1596870230751-ebdfce98ec42?w=300&h=400&fit=crop",
      originalPrice: 799.0,
      salePrice: 559.0,
      discount: 30,
      rating: 4.5,
      category: "Baby Clothing",
    },
    {
      id: 14,
      name: "Baby Winter Jacket",
      brand: "GAP KIDS",
      image:
        "https://images.unsplash.com/photo-1519689680058-324335c77eba?w=300&h=400&fit=crop",
      originalPrice: 1999.0,
      salePrice: 1599.0,
      discount: 20,
      rating: 4.3,
      category: "Baby Clothing",
    },

    // Electronics - Smartphones & Tablets
    {
      id: 15,
      name: "iPhone 15 Pro 128GB",
      brand: "APPLE",
      image:
        "https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=300&h=400&fit=crop",
      originalPrice: 134900.0,
      salePrice: 129900.0,
      discount: 4,
      rating: 4.7,
      category: "Electronics",
    },
    {
      id: 16,
      name: "Samsung Galaxy S24 Ultra 256GB",
      brand: "SAMSUNG",
      image:
        "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=300&h=400&fit=crop",
      originalPrice: 124999.0,
      salePrice: 119999.0,
      discount: 4,
      rating: 4.6,
      category: "Electronics",
    },
    {
      id: 17,
      name: "OnePlus 12 5G 256GB",
      brand: "ONEPLUS",
      image:
        "https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?w=300&h=400&fit=crop",
      originalPrice: 64999.0,
      salePrice: 59999.0,
      discount: 8,
      rating: 4.4,
      category: "Electronics",
    },
    {
      id: 18,
      name: "iPad Air 10.9 inch 64GB",
      brand: "APPLE",
      image:
        "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=300&h=400&fit=crop",
      originalPrice: 54900.0,
      salePrice: 52900.0,
      discount: 4,
      rating: 4.5,
      category: "Electronics",
    },

    // Electronics - Laptops
    {
      id: 19,
      name: "MacBook Air M2 13-inch 256GB",
      brand: "APPLE",
      image:
        "https://images.unsplash.com/photo-1541807084-5c52b6b3adef?w=300&h=400&fit=crop",
      originalPrice: 114900.0,
      salePrice: 109900.0,
      discount: 4,
      rating: 4.8,
      category: "Electronics",
    },
    {
      id: 20,
      name: "Dell XPS 13 Plus i7 16GB RAM",
      brand: "DELL",
      image:
        "https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?w=300&h=400&fit=crop",
      originalPrice: 159990.0,
      salePrice: 144990.0,
      discount: 9,
      rating: 4.3,
      category: "Electronics",
    },
    {
      id: 21,
      name: "HP Pavilion Gaming Laptop RTX 3060",
      brand: "HP",
      image:
        "https://images.unsplash.com/photo-1603302576837-37561b2e2302?w=300&h=400&fit=crop",
      originalPrice: 89990.0,
      salePrice: 79990.0,
      discount: 11,
      rating: 4.2,
      category: "Electronics",
    },

    // Earphones & Earbuds
    {
      id: 22,
      name: "AirPods Pro 2nd Generation",
      brand: "APPLE",
      image:
        "https://images.unsplash.com/photo-1606220945770-b5b6c2c55bf1?w=300&h=400&fit=crop",
      originalPrice: 26900.0,
      salePrice: 24900.0,
      discount: 7,
      rating: 4.6,
      category: "Earphones",
    },
    {
      id: 23,
      name: "Sony WH-1000XM5 Wireless Headphones",
      brand: "SONY",
      image:
        "https://images.unsplash.com/photo-1583394838336-acd977736f90?w=300&h=400&fit=crop",
      originalPrice: 29990.0,
      salePrice: 26990.0,
      discount: 10,
      rating: 4.7,
      category: "Earphones",
    },
    {
      id: 24,
      name: "boAt Airdopes 141 Bluetooth Earbuds",
      brand: "BOAT",
      image:
        "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=300&h=400&fit=crop",
      originalPrice: 2499.0,
      salePrice: 1299.0,
      discount: 48,
      rating: 4.1,
      category: "Earbuds",
    },
    {
      id: 25,
      name: "JBL Tune 230NC TWS Earbuds",
      brand: "JBL",
      image:
        "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=300&h=400&fit=crop",
      originalPrice: 6999.0,
      salePrice: 4999.0,
      discount: 29,
      rating: 4.3,
      category: "Earbuds",
    },
    {
      id: 26,
      name: "Realme Buds Air 3 Neo",
      brand: "REALME",
      image:
        "https://images.unsplash.com/photo-1572569511254-d8f925fe2cbb?w=300&h=400&fit=crop",
      originalPrice: 2999.0,
      salePrice: 1999.0,
      discount: 33,
      rating: 4.0,
      category: "Earbuds",
    },
    {
      id: 27,
      name: "Sennheiser HD 450BT Wireless",
      brand: "SENNHEISER",
      image:
        "https://images.unsplash.com/photo-1484704849700-f032a568e944?w=300&h=400&fit=crop",
      originalPrice: 12990.0,
      salePrice: 9990.0,
      discount: 23,
      rating: 4.4,
      category: "Earphones",
    },

    // Home Appliances - Kitchen
    {
      id: 28,
      name: "LG 260L Double Door Refrigerator",
      brand: "LG",
      image:
        "https://images.unsplash.com/photo-1571175443880-49e1d25b2bc5?w=300&h=400&fit=crop",
      originalPrice: 32990.0,
      salePrice: 28990.0,
      discount: 12,
      rating: 4.3,
      category: "Home Appliances",
    },
    {
      id: 29,
      name: "Samsung 6.5kg Fully Automatic Washing Machine",
      brand: "SAMSUNG",
      image:
        "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=300&h=400&fit=crop",
      originalPrice: 22990.0,
      salePrice: 19990.0,
      discount: 13,
      rating: 4.2,
      category: "Home Appliances",
    },
    {
      id: 30,
      name: "Whirlpool 1.5 Ton 3 Star AC",
      brand: "WHIRLPOOL",
      image:
        "https://images.unsplash.com/photo-1581093458791-9d42e72f6e2d?w=300&h=400&fit=crop",
      originalPrice: 34990.0,
      salePrice: 29990.0,
      discount: 14,
      rating: 4.1,
      category: "Home Appliances",
    },
    {
      id: 31,
      name: "Prestige Induction Cooktop 2000W",
      brand: "PRESTIGE",
      image:
        "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=300&h=400&fit=crop",
      originalPrice: 3995.0,
      salePrice: 2995.0,
      discount: 25,
      rating: 4.2,
      category: "Home Appliances",
    },
    {
      id: 32,
      name: "Philips Air Fryer HD9252/90 4.1L",
      brand: "PHILIPS",
      image:
        "https://images.unsplash.com/photo-1585515656662-e9348b5f1ae9?w=300&h=400&fit=crop",
      originalPrice: 12995.0,
      salePrice: 9995.0,
      discount: 23,
      rating: 4.4,
      category: "Home Appliances",
    },
    {
      id: 33,
      name: "Havells OTG 25L Toaster Oven",
      brand: "HAVELLS",
      image:
        "https://images.unsplash.com/photo-1574269909862-7e1d70bb8078?w=300&h=400&fit=crop",
      originalPrice: 6999.0,
      salePrice: 5499.0,
      discount: 21,
      rating: 4.0,
      category: "Home Appliances",
    },

    // Home Appliances - Cleaning
    {
      id: 34,
      name: "Dyson V15 Detect Cordless Vacuum",
      brand: "DYSON",
      image:
        "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=300&h=400&fit=crop",
      originalPrice: 65900.0,
      salePrice: 59900.0,
      discount: 9,
      rating: 4.6,
      category: "Home Appliances",
    },
    {
      id: 35,
      name: "Eureka Forbes Wet & Dry Vacuum",
      brand: "EUREKA FORBES",
      image:
        "https://images.unsplash.com/photo-1544966503-7cc5ac882d5d?w=300&h=400&fit=crop",
      originalPrice: 8999.0,
      salePrice: 6999.0,
      discount: 22,
      rating: 4.1,
      category: "Home Appliances",
    },
    {
      id: 36,
      name: "Mi Robot Vacuum Mop 2 Pro+",
      brand: "XIAOMI",
      image:
        "https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=300&h=400&fit=crop",
      originalPrice: 34999.0,
      salePrice: 29999.0,
      discount: 14,
      rating: 4.3,
      category: "Home Appliances",
    },

    // Electronics - Smart Home
    {
      id: 37,
      name: "Amazon Echo Dot 5th Gen",
      brand: "AMAZON",
      image:
        "https://images.unsplash.com/photo-1543512214-318c7553f230?w=300&h=400&fit=crop",
      originalPrice: 5499.0,
      salePrice: 3499.0,
      discount: 36,
      rating: 4.3,
      category: "Electronics",
    },
    {
      id: 38,
      name: "Google Nest Hub 2nd Gen",
      brand: "GOOGLE",
      image:
        "https://images.unsplash.com/photo-1518444065439-e933c06ce9cd?w=300&h=400&fit=crop",
      originalPrice: 9999.0,
      salePrice: 7999.0,
      discount: 20,
      rating: 4.2,
      category: "Electronics",
    },
    {
      id: 39,
      name: "TP-Link Kasa Smart Bulb 4-Pack",
      brand: "TP-LINK",
      image:
        "https://images.unsplash.com/photo-1513506003901-1e6a229e2d15?w=300&h=400&fit=crop",
      originalPrice: 3999.0,
      salePrice: 2999.0,
      discount: 25,
      rating: 4.1,
      category: "Electronics",
    },

    // Electronics - Gaming
    {
      id: 40,
      name: "PlayStation 5 Console",
      brand: "SONY",
      image:
        "https://images.unsplash.com/photo-1606144042614-b2417e99c4e3?w=300&h=400&fit=crop",
      originalPrice: 54990.0,
      salePrice: 54990.0,
      discount: 0,
      rating: 4.8,
      category: "Electronics",
    },
    {
      id: 41,
      name: "Xbox Series X 1TB",
      brand: "MICROSOFT",
      image:
        "https://images.unsplash.com/photo-1621259182978-fbf93132d53d?w=300&h=400&fit=crop",
      originalPrice: 49990.0,
      salePrice: 47990.0,
      discount: 4,
      rating: 4.7,
      category: "Electronics",
    },
    {
      id: 42,
      name: "Nintendo Switch OLED Model",
      brand: "NINTENDO",
      image:
        "https://images.unsplash.com/photo-1578303512597-81e6cc155b3e?w=300&h=400&fit=crop",
      originalPrice: 37999.0,
      salePrice: 35999.0,
      discount: 5,
      rating: 4.6,
      category: "Electronics",
    },
    {
      id: 43,
      name: "Logitech G Pro X Gaming Headset",
      brand: "LOGITECH",
      image:
        "https://images.unsplash.com/photo-1577174881658-0f30ed549adc?w=300&h=400&fit=crop",
      originalPrice: 12995.0,
      salePrice: 9995.0,
      discount: 23,
      rating: 4.4,
      category: "Electronics",
    },

    // Electronics - Accessories
    {
      id: 44,
      name: "Anker PowerCore 10000mAh Power Bank",
      brand: "ANKER",
      image:
        "https://images.unsplash.com/photo-1609592806955-d0c44e3d3bb5?w=300&h=400&fit=crop",
      originalPrice: 2999.0,
      salePrice: 2199.0,
      discount: 27,
      rating: 4.3,
      category: "Electronics",
    },
    {
      id: 45,
      name: "SanDisk Ultra 64GB USB 3.0 Flash Drive",
      brand: "SANDISK",
      image:
        "https://images.unsplash.com/photo-1595044426077-d36d9236d54a?w=300&h=400&fit=crop",
      originalPrice: 1299.0,
      salePrice: 899.0,
      discount: 31,
      rating: 4.2,
      category: "Electronics",
    },
    {
      id: 46,
      name: "Belkin 3-in-1 Wireless Charger",
      brand: "BELKIN",
      image:
        "https://images.unsplash.com/photo-1625948515291-69613efd103f?w=300&h=400&fit=crop",
      originalPrice: 12999.0,
      salePrice: 9999.0,
      discount: 23,
      rating: 4.1,
      category: "Electronics",
    },

    // Home & Kitchen - Furniture
    {
      id: 47,
      name: "IKEA POÄNG Armchair with Cushion",
      brand: "IKEA",
      image:
        "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=300&h=400&fit=crop",
      originalPrice: 12999.0,
      salePrice: 10999.0,
      discount: 15,
      rating: 4.4,
      category: "Home Appliances",
    },
    {
      id: 48,
      name: "Urban Ladder Pastel Dining Table 4-Seater",
      brand: "URBAN LADDER",
      image:
        "https://images.unsplash.com/photo-1506439773649-6e0eb8cfb237?w=300&h=400&fit=crop",
      originalPrice: 24999.0,
      salePrice: 19999.0,
      discount: 20,
      rating: 4.2,
      category: "Home Appliances",
    },
    {
      id: 49,
      name: "Wakefit Orthopedic Memory Foam Mattress",
      brand: "WAKEFIT",
      image:
        "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=300&h=400&fit=crop",
      originalPrice: 18999.0,
      salePrice: 13999.0,
      discount: 26,
      rating: 4.3,
      category: "Home Appliances",
    },

    // Beauty & Personal Care
    {
      id: 50,
      name: "Olay Regenerist Micro-Sculpting Cream",
      brand: "OLAY",
      image:
        "https://images.unsplash.com/photo-1556228720-195a672e8a03?w=300&h=400&fit=crop",
      originalPrice: 1699.0,
      salePrice: 1359.0,
      discount: 20,
      rating: 4.1,
      category: "Beauty",
    },
    {
      id: 51,
      name: "Gillette Fusion5 ProGlide Razor",
      brand: "GILLETTE",
      image:
        "https://images.unsplash.com/photo-1499781350541-7783f6c6a0c8?w=300&h=400&fit=crop",
      originalPrice: 899.0,
      salePrice: 719.0,
      discount: 20,
      rating: 4.4,
      category: "Beauty",
    },
    {
      id: 52,
      name: "L'Oreal Paris Hair Spa Deep Nourishing Creambath",
      brand: "L'OREAL",
      image:
        "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=300&h=400&fit=crop",
      originalPrice: 399.0,
      salePrice: 299.0,
      discount: 25,
      rating: 4.0,
      category: "Beauty",
    },

    // Sports & Fitness
    {
      id: 53,
      name: "Decathlon Domyos Yoga Mat 8mm",
      brand: "DECATHLON",
      image:
        "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=300&h=400&fit=crop",
      originalPrice: 1499.0,
      salePrice: 1199.0,
      discount: 20,
      rating: 4.3,
      category: "Sports",
    },
    {
      id: 54,
      name: "Nike Air Force 1 '07 Sneakers",
      brand: "NIKE",
      image:
        "https://images.unsplash.com/photo-1549298916-b41d501d3772?w=300&h=400&fit=crop",
      originalPrice: 7995.0,
      salePrice: 6396.0,
      discount: 20,
      rating: 4.6,
      category: "Sports",
    },
    {
      id: 55,
      name: "Adidas Ultraboost 22 Running Shoes",
      brand: "ADIDAS",
      image:
        "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=300&h=400&fit=crop",
      originalPrice: 16999.0,
      salePrice: 13599.0,
      discount: 20,
      rating: 4.5,
      category: "Sports",
    },
  ];

  const categories = [
    "All",
    "Fashion",
    "Electronics",
    "Bags",
    "Footwear",
    "Groceries",
    "Beauty",
  ];

  const filteredProducts = useMemo(() => {
    console.log("Filtering with:", {
      activeTab,
      priceRange,
      selectedRatings,
      sortBy,
    });

    let filtered = products.filter((product) => {
      const categoryMatch =
        activeTab === "All" || product.category === activeTab;
      const priceMatch =
        product.salePrice >= priceRange[0] &&
        product.salePrice <= priceRange[1];
      const ratingMatch =
        selectedRatings.length === 0 ||
        selectedRatings.includes(product.rating);

      return categoryMatch && priceMatch && ratingMatch;
    });

    // Sort products
    switch (sortBy) {
      case "Name, A To Z":
        filtered.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case "Name, Z To A":
        filtered.sort((a, b) => b.name.localeCompare(a.name));
        break;
      case "Price, Low To High":
        filtered.sort((a, b) => a.salePrice - b.salePrice);
        break;
      case "Price, High To Low":
        filtered.sort((a, b) => b.salePrice - a.salePrice);
        break;
      default:
        break;
    }

    console.log("Filtered products:", filtered.length);
    return filtered;
  }, [activeTab, priceRange, selectedRatings, sortBy]);

  const handleCategoryChange = (category) => {
    console.log("Category clicked:", category);
    setActiveTab(category);
  };

  const handleRatingChange = (rating) => {
    console.log("Rating clicked:", rating);
    setSelectedRatings((prev) => {
      const newRatings = prev.includes(rating)
        ? prev.filter((r) => r !== rating)
        : [...prev, rating];
      console.log("New ratings:", newRatings);
      return newRatings;
    });
  };

  const handlePriceChange = (e) => {
    const newMax = parseInt(e.target.value);
    console.log("Price changed to:", newMax);
    setPriceRange([0, newMax]);
  };

  const handleSortChange = (e) => {
    console.log("Sort changed to:", e.target.value);
    setSortBy(e.target.value);
  };

  const addToCart = (product) => {
    console.log("Adding to cart:", product.name);
    setCart((prev) => {
      const existing = prev.find((item) => item.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
  };

  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        size={14}
        className={`${
          i < rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
        }`}
      />
    ));
  };

  const Sidebar = () => (
    <div className="bg-white p-4 lg:p-6 shadow-sm h-full overflow-y-auto">
      {/* Shop by Category - Now as Tabs */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-medium text-gray-900">
            Shop by Category
          </h3>
          <ChevronDown className="text-gray-400" size={16} />
        </div>
        <div className="space-y-2">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => handleCategoryChange(category)}
              className={`w-full text-left px-3 py-2 rounded-lg transition-colors ${
                activeTab === category
                  ? "bg-blue-100 text-blue-600 font-medium"
                  : "text-gray-700 hover:bg-gray-50"
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      {/* Filter By Price */}
      <div className="mb-6">
        <h3 className="text-lg font-medium text-gray-900 mb-4">
          Filter By Price
        </h3>
        <div className="relative">
          <input
            type="range"
            min="0"
            max="60000"
            step="100"
            value={priceRange[1]}
            onChange={handlePriceChange}
            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
          />
          <div className="flex justify-between mt-2 text-sm text-gray-600">
            <span>From: ₹{priceRange[0]}</span>
            <span>To: ₹{priceRange[1]}</span>
          </div>
        </div>
      </div>

      {/* Filter By Rating */}
      <div>
        <h3 className="text-lg font-medium text-gray-900 mb-4">
          Filter By Rating
        </h3>
        <div className="space-y-3">
          {[5, 4, 3, 2, 1].map((rating) => (
            <label
              key={rating}
              className="flex items-center cursor-pointer hover:bg-gray-50 p-1 rounded"
            >
              <input
                type="checkbox"
                checked={selectedRatings.includes(rating)}
                onChange={() => handleRatingChange(rating)}
                className="w-4 h-4 text-blue-500 border-2 border-gray-300 rounded focus:ring-blue-500"
              />
              <div className="ml-3 flex items-center">
                {renderStars(rating)}
              </div>
            </label>
          ))}
        </div>
      </div>
    </div>
  );

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col lg:flex-row">
          {/* Mobile Sidebar Toggle */}
          <div className="lg:hidden bg-white p-4 border-b">
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="flex items-center text-gray-700"
            >
              <List size={20} className="mr-2" />
              Filters {activeTab !== "All" && `(${activeTab})`}
            </button>
          </div>

          {/* Sidebar - Desktop */}
          <div className="hidden lg:block w-64 min-h-screen">
            <Sidebar />
          </div>

          {/* Sidebar - Mobile */}
          {sidebarOpen && (
            <div className="lg:hidden fixed inset-0 z-50 bg-black bg-opacity-50">
              <div className="bg-white w-80 h-full">
                <div className="p-4 border-b flex justify-between items-center">
                  <h2 className="text-lg font-semibold">Filters</h2>
                  <button
                    onClick={() => setSidebarOpen(false)}
                    className="text-gray-500 hover:text-gray-700"
                  >
                    ✕
                  </button>
                </div>
                <Sidebar />
              </div>
            </div>
          )}

          {/* Main Content */}
          <div className="flex-1 p-4 lg:p-6">
            {/* Category Tabs - Desktop */}
            <div className="hidden lg:block mb-6">
              <div className="flex space-x-1 bg-gray-100 p-1 rounded-lg">
                {categories.map((category) => (
                  <button
                    key={category}
                    onClick={() => handleCategoryChange(category)}
                    className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                      activeTab === category
                        ? "bg-white text-blue-600 shadow-sm"
                        : "text-gray-600 hover:text-blue-600"
                    }`}
                  >
                    {category}
                  </button>
                ))}
              </div>
            </div>

            {/* Header */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 bg-white p-4 rounded-lg shadow-sm gap-4">
              <div className="flex items-center gap-4">
                <button
                  onClick={() => setViewMode("list")}
                  className={`p-2 rounded ${
                    viewMode === "list"
                      ? "bg-blue-100 text-blue-600"
                      : "text-gray-500 hover:bg-gray-100"
                  }`}
                >
                  <List size={20} />
                </button>
                <button
                  onClick={() => setViewMode("grid")}
                  className={`p-2 rounded ${
                    viewMode === "grid"
                      ? "bg-blue-100 text-blue-600"
                      : "text-gray-500 hover:bg-gray-100"
                  }`}
                >
                  <Grid size={20} />
                </button>
                <span className="text-gray-600">
                  There are {filteredProducts.length} products.
                </span>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-gray-600 text-sm sm:text-base">
                  Sort By
                </span>
                <select
                  value={sortBy}
                  onChange={handleSortChange}
                  className="border border-gray-300 rounded-lg px-3 py-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
                >
                  <option value="Name, A To Z">Name, A To Z</option>
                  <option value="Name, Z To A">Name, Z To A</option>
                  <option value="Price, Low To High">Price, Low To High</option>
                  <option value="Price, High To Low">Price, High To Low</option>
                </select>
              </div>
            </div>

            {/* Products Grid */}
            <div
              className={`grid gap-4 lg:gap-6 ${
                viewMode === "grid"
                  ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
                  : "grid-cols-1"
              }`}
            >
              {filteredProducts.map((product) => (
                <div
                  key={product.id}
                  className={`bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-shadow ${
                    viewMode === "list" ? "flex" : ""
                  }`}
                >
                  <div
                    className={`relative ${viewMode === "list" ? "w-1/5" : ""}`}
                  >
                    <img
                      src={product.image}
                      alt={product.name}
                      className={`object-cover ${
                        viewMode === "list"
                          ? "w-full h-32"
                          : "w-full h-36 sm:h-40"
                      }`}
                      onError={(e) => {
                        e.target.src =
                          "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAwIiBoZWlnaHQ9IjQwMCIgdmlld0JveD0iMCAwIDMwMCA0MDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIzMDAiIGhlaWdodD0iNDAwIiBmaWxsPSIjRjNGNEY2Ii8+CjxwYXRoIGQ9Ik0xMzAgMTYwSDI1MEwyMTAgMjQwSDE3MEwxMzAgMTYwWiIgZmlsbD0iI0Q1RDdEQSIvPgo8L3N2Zz4=";
                      }}
                    />
                    <div className="absolute top-2 left-2 bg-blue-500 text-white px-2 py-1 rounded text-xs font-semibold">
                      {product.discount}%
                    </div>
                  </div>

                  <div className={`p-3 ${viewMode === "list" ? "flex-1" : ""}`}>
                    <div className="text-xs text-gray-500 uppercase tracking-wide mb-1 font-medium">
                      {product.brand}
                    </div>
                    <h3 className="text-sm text-gray-800 mb-2 font-medium leading-tight">
                      {product.name}
                    </h3>

                    <div className="flex items-center mb-2">
                      {renderStars(product.rating)}
                    </div>

                    <div
                      className={`flex items-center gap-2 mb-3 ${
                        viewMode === "list" ? "flex-wrap" : ""
                      }`}
                    >
                      <span className="text-gray-400 line-through text-sm">
                        ₹{product.originalPrice.toLocaleString("en-IN")}
                      </span>
                      <span className="text-red-600 font-semibold">
                        ₹{product.salePrice.toLocaleString("en-IN")}
                      </span>
                    </div>

                    <button
                      onClick={handleAddToCart}
                      className={`bg-white border border-blue-500 text-blue-500 py-1.5 px-3 rounded-lg hover:bg-blue-50 transition-colors flex items-center justify-center gap-2 text-xs font-semibold uppercase tracking-wide ${
                        viewMode === "list" ? "w-auto min-w-32" : "w-full"
                      }`}
                    >
                      <ShoppingCart size={14} />
                      ADD TO CART
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {filteredProducts.length === 0 && (
              <div className="text-center py-12">
                <p className="text-gray-500 text-lg">
                  No products found matching your criteria.
                </p>
                <button
                  onClick={() => {
                    setActiveTab("All");
                    setSelectedRatings([]);
                    setPriceRange([0, 60000]);
                  }}
                  className="mt-4 text-blue-500 hover:underline"
                >
                  Clear all filters
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Cart Indicator */}
      {cart.length > 0 && (
        <div className="fixed bottom-4 right-4 bg-blue-600 text-white px-4 py-2 rounded-full shadow-lg flex items-center gap-2 z-40">
          <ShoppingCart size={20} />
          <span className="text-sm">
            Cart: {cart.reduce((sum, item) => sum + item.quantity, 0)}
          </span>
        </div>
      )}

      <style jsx>{`
        input[type="range"] {
          -webkit-appearance: none;
          background: linear-gradient(
            to right,
            #3b82f6 0%,
            #3b82f6 ${(priceRange[1] / 60000) * 100}%,
            #e5e7eb ${(priceRange[1] / 60000) * 100}%,
            #e5e7eb 100%
          );
        }

        input[type="range"]::-webkit-slider-thumb {
          -webkit-appearance: none;
          height: 20px;
          width: 20px;
          border-radius: 50%;
          background: #3b82f6;
          cursor: pointer;
          border: 2px solid white;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
        }

        input[type="range"]::-moz-range-thumb {
          height: 20px;
          width: 20px;
          border-radius: 50%;
          background: #3b82f6;
          cursor: pointer;
          border: 2px solid white;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
        }
      `}</style>
    </div>
  );
};

export default Projects;
