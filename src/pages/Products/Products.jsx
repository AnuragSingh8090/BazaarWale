import { useState, useEffect, useRef } from "react";
import { FiFilter, FiGrid, FiList } from "react-icons/fi";
import { AiFillStar } from "react-icons/ai";
import ProductCard from "../../components/ProductCard/ProductCard";
import ScrollToTop from '../../components/ScrollToTop/ScrollToTop'
import ProductCardSkeleton from "../../components/ProductCardSkeleton/ProductCardSkeleton";
import "./Products.css";

const Products = () => {
  const [filters, setFilters] = useState({
    priceRange: [0, 10000],
    categories: [],
    brands: [],
    rating: 0,
  });
  const [sortBy, setSortBy] = useState("popular");
  const [viewMode, setViewMode] = useState("grid");
  const [showFilters, setShowFilters] = useState(false);
  const [favorites, setFavorites] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [cart, setCart] = useState({});

  const products = [
    {
      id: 1,
      name: "Wireless Bluetooth Headphones",
      price: 2499,
      originalPrice: 4999,
      image: "https://picsum.photos/300/300?random=1",
      rating: 4.5,
      reviews: 1250,
      category: "Electronics",
      brand: "AudioTech",
    },
    {
      id: 2,
      name: "Smart Watch with Fitness Tracker",
      price: 3999,
      originalPrice: 7999,
      image: "https://picsum.photos/300/300?random=2",
      rating: 4.3,
      reviews: 890,
      category: "Electronics",
      brand: "FitGear",
    },
    {
      id: 3,
      name: "Premium Cotton T-Shirt",
      price: 599,
      originalPrice: 1299,
      image: "https://picsum.photos/300/300?random=3",
      rating: 4.6,
      reviews: 2100,
      category: "Fashion",
      brand: "StyleCo",
    },
    {
      id: 4,
      name: "Laptop Backpack with USB Charging",
      price: 1299,
      originalPrice: 2499,
      image: "https://picsum.photos/300/300?random=4",
      rating: 4.4,
      reviews: 650,
      category: "Accessories",
      brand: "TravelPro",
    },
    {
      id: 5,
      name: "Wireless Mouse - Ergonomic Design",
      price: 899,
      originalPrice: 1799,
      image: "https://picsum.photos/300/300?random=5",
      rating: 4.7,
      reviews: 1520,
      category: "Electronics",
      brand: "TechPlus",
    },
    {
      id: 6,
      name: "Running Shoes - Lightweight",
      price: 2799,
      originalPrice: 5999,
      image: "https://picsum.photos/300/300?random=6",
      rating: 4.5,
      reviews: 980,
      category: "Fashion",
      brand: "SportMax",
    },
  ];

  const categories = ["Electronics", "Fashion", "Accessories", "Home & Kitchen"];
  const brands = ["AudioTech", "FitGear", "StyleCo", "TravelPro", "TechPlus", "SportMax"];

  const handleOutsideClick = (elem) => {

    if (!elem.target.closest('.sticky-sidebar') && !elem.target.closest('.filter-btn')) {
      setShowFilters(false)

    }
  }
  const handlePriceChange = (e, index) => {
    const newRange = [...filters.priceRange];
    newRange[index] = parseInt(e.target.value);
    setFilters({ ...filters, priceRange: newRange });
  };

  const toggleCategory = (category) => {
    setFilters({
      ...filters,
      categories: filters.categories.includes(category)
        ? filters.categories.filter((c) => c !== category)
        : [...filters.categories, category],
    });
  };

  const toggleBrand = (brand) => {
    setFilters({
      ...filters,
      brands: filters.brands.includes(brand)
        ? filters.brands.filter((b) => b !== brand)
        : [...filters.brands, brand],
    });
  };

  const clearFilters = () => {
    setFilters({
      priceRange: [0, 10000],
      categories: [],
      brands: [],
      rating: 0,
    });
  };

  const toggleFavorite = (productId) => {
    setFavorites((prev) =>
      prev.includes(productId)
        ? prev.filter((id) => id !== productId)
        : [...prev, productId]
    );
  };

  useEffect(() => {
    window.addEventListener('click', handleOutsideClick)
  }, [])

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  const addToCart = (productId) => {
    setCart((prev) => ({
      ...prev,
      [productId]: (prev[productId] || 0) + 1,
    }));
  };

  const removeFromCart = (productId) => {
    setCart((prev) => {
      const newCart = { ...prev };
      if (newCart[productId] > 1) {
        newCart[productId] -= 1;
      } else {
        delete newCart[productId];
      }
      return newCart;
    });
  };

  const deleteFromCart = (productId) => {
    setCart((prev) => {
      const newCart = { ...prev };
      delete newCart[productId];
      return newCart;
    });
  };

  // Filter products based on selected filters
  const getFilteredProducts = () => {
    return products.filter((product) => {
      // Price filter
      if (product.price < filters.priceRange[0] || product.price > filters.priceRange[1]) {
        return false;
      }

      // Category filter
      if (filters.categories.length > 0 && !filters.categories.includes(product.category)) {
        return false;
      }

      // Brand filter
      if (filters.brands.length > 0 && !filters.brands.includes(product.brand)) {
        return false;
      }

      // Rating filter
      if (filters.rating > 0 && product.rating < filters.rating) {
        return false;
      }

      return true;
    });
  };

  // Sort filtered products
  const getSortedProducts = () => {
    const filtered = getFilteredProducts();
    const sorted = [...filtered];

    switch (sortBy) {
      case "priceLow":
        return sorted.sort((a, b) => a.price - b.price);
      case "priceHigh":
        return sorted.sort((a, b) => b.price - a.price);
      case "rating":
        return sorted.sort((a, b) => b.rating - a.rating);
      case "newest":
        return sorted.reverse();
      case "popular":
      default:
        return sorted.sort((a, b) => b.reviews - a.reviews);
    }
  };

  const displayedProducts = getSortedProducts();

  return (
    <div className="min-h-screen bg-gray-50">
      <ScrollToTop />

      <div className="max-w-7xl mx-auto px-3 py-3">
        <div className="flex gap-3">

          <aside
            className={`${showFilters ? "block" : "hidden"
              } lg:block sticky-sidebar lg:w-1/4 bg-white max-h-[90%] lg:max-h-auto overflow-auto lg:overflow-visible rounded-lg shadow-sm p-3 h-fit sticky top-[124px]`}
          >
            <div className="flex items-center gap-2 mb-3 sticky lg:static top-0">
              <FiFilter size={18} className="text-gray-700" />
              <h2 className="text-base font-semibold text-gray-800 flex-1">Filters</h2>
              <button
                onClick={clearFilters}
                disabled={isLoading}
                className="text-xs text-[var(--primary)] hover:underline disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Clear All
              </button>
              <button
                onClick={() => setShowFilters(false)}
                className="lg:hidden ms-1 py-1 px-2  text-xs rounded-md bg-[var(--primary)] text-[white]  "
              >
                Apply
              </button>
            </div>

            {/* Price Range */}
            <div className="mb-3 pb-3 border-b border-gray-200">
              <h3 className="font-medium text-sm text-gray-700 mb-2">Price Range</h3>
              <div className="space-y-2">
                <input
                  type="range"
                  min="0"
                  max="10000"
                  value={filters.priceRange[0]}
                  onChange={(e) => handlePriceChange(e, 0)}
                  disabled={isLoading}
                  className="w-full accent-[var(--primary)] disabled:opacity-50"
                />
                <div className="flex justify-between text-xs text-gray-600">
                  <span>₹{filters.priceRange[0]}</span>
                  <span>₹{filters.priceRange[1]}</span>
                </div>
              </div>
            </div>

            {/* Categories */}
            <div className="mb-3 pb-3 border-b border-gray-200">
              <h3 className="font-medium text-sm text-gray-700 mb-2">Categories</h3>
              <div className="space-y-1.5">
                {categories.map((category) => (
                  <label key={category} className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={filters.categories.includes(category)}
                      onChange={() => toggleCategory(category)}
                      disabled={isLoading}
                      className="w-3.5 h-3.5 text-[var(--primary)] rounded focus:ring-[var(--primary)] disabled:opacity-50"
                    />
                    <span className="text-sm text-gray-700">{category}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Brands */}
            <div className="mb-3 pb-3 border-b border-gray-200">
              <h3 className="font-medium text-sm text-gray-700 mb-2">Brands</h3>
              <div className="space-y-1.5">
                {brands.map((brand) => (
                  <label key={brand} className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={filters.brands.includes(brand)}
                      onChange={() => toggleBrand(brand)}
                      disabled={isLoading}
                      className="w-3.5 h-3.5 text-[var(--primary)] rounded focus:ring-[var(--primary)] disabled:opacity-50"
                    />
                    <span className="text-sm text-gray-700">{brand}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Rating */}
            <div>
              <h3 className="font-medium text-sm text-gray-700 mb-2">Customer Rating</h3>
              <div className="space-y-1.5">
                {[4, 3, 2, 1].map((rating) => (
                  <label key={rating} className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      name="rating"
                      checked={filters.rating === rating}
                      onChange={() => setFilters({ ...filters, rating: rating })}
                      disabled={isLoading}
                      className="w-3.5 h-3.5 text-[var(--primary)] focus:ring-[var(--primary)] disabled:opacity-50"
                    />
                    <div className="flex items-center gap-0.5">
                      {[...Array(rating)].map((_, i) => (
                        <AiFillStar key={i} className="text-yellow-400 text-sm" />
                      ))}
                    </div>
                  </label>
                ))}
              </div>
            </div>
          </aside>

          {/* Main Content */}
          <main className="flex-1">
            <div className="flex justify-between items-center mb-3 bg-white rounded-lg shadow-sm p-2.5">
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setShowFilters(!showFilters)}
                  disabled={isLoading}
                  className="filter-btn lg:hidden flex items-center gap-2 px-3 py-[5px] bg-[var(--primary)] text-white rounded text-sm disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <FiFilter size={14} />
                  Filters
                </button>
                <div className="text-sm text-gray-600 hidden sm:inline">
                  Showing <span className="font-semibold">{displayedProducts.length}</span> results
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-2">
                  <span className="text-xs text-gray-600 hidden lg:inline">Sort by:</span>
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    disabled={isLoading}
                    className="px-2 py-[4px] cursor-pointer lg:py-1.5 text-sm border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-[var(--primary)] disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <option value="popular">Popular</option>
                    <option value="priceLow">Price: Low to High</option>
                    <option value="priceHigh">Price: High to Low</option>
                    <option value="newest">Newest First</option>
                    <option value="rating">Highest Rated</option>
                  </select>
                </div>
                {/* <div className="flex gap-1.5">
                  <button
                    onClick={() => setViewMode("grid")}
                    disabled={isLoading}
                    className={`p-1.5 rounded disabled:opacity-50 disabled:cursor-not-allowed ${viewMode === "grid"
                      ? "bg-[var(--primary)] text-white"
                      : "bg-gray-100 text-gray-600"
                      }`}
                  >
                    <FiGrid size={16} />
                  </button>
                  <button
                    onClick={() => setViewMode("list")}
                    disabled={isLoading}
                    className={`p-1.5 rounded disabled:opacity-50 disabled:cursor-not-allowed ${viewMode === "list"
                      ? "bg-[var(--primary)] text-white"
                      : "bg-gray-100 text-gray-600"
                      }`}
                  >
                    <FiList size={16} />
                  </button>
                </div> */}
              </div>
            </div>

            {/* Products Grid */}
            <div
              className={`flex flex-wrap gap-3 ${viewMode === "grid"
                ? ""
                : "flex-col"
                }`}
            >
              {isLoading
                ? [...Array(6)].map((_, index) => (
                  <ProductCardSkeleton key={index} />
                ))
                : displayedProducts.length > 0
                  ? displayedProducts.map((product) => (
                    <ProductCard
                      key={product.id}
                      product={product}
                      isFavorite={favorites.includes(product.id)}
                      onToggleFavorite={toggleFavorite}
                      cartQuantity={cart[product.id] || 0}
                      onAddToCart={addToCart}
                      onRemoveFromCart={removeFromCart}
                      onDeleteFromCart={deleteFromCart}
                    />
                  ))
                  : (
                    <div className="w-full flex flex-col items-center justify-center py-16 px-4">
                      <div className="text-gray-300 mb-4">
                        <svg
                          className="w-24 h-24"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={1.5}
                            d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"
                          />
                        </svg>
                      </div>
                      <h3 className="text-xl font-semibold text-gray-700">No Items Found</h3>
                    </div>
                  )}
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};

export default Products;