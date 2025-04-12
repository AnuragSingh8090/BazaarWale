import { useState, useMemo } from "react";
import "./Home.css";

const Home = () => {
  const [filter, setFilter] = useState("default");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [hoveredProduct, setHoveredProduct] = useState(null);

  // Updated products list with reliable images
  const products = [
    {
      id: 1,
      name: "Smartphone X",
      price: 59999,
      image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=400&h=300&q=80",
      category: "Mobile",
      isNew: true,
    },
    {
      id: 2,
      name: "Laptop Pro",
      price: 97499,
      image: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=400&h=300&q=80",
      category: "Laptop",
      isNew: false,
    },
    {
      id: 3,
      name: "Wireless Earbuds",
      price: 11199,
      image: "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=400&h=300&q=80",
      category: "Accessories",
      isNew: true,
    },
    {
      id: 4,
      name: "4K Smart TV",
      price: 74999,
      image: "https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?w=400&h=300&q=80",
      category: "TV",
      isNew: false,
    },
    {
      id: 5,
      name: "Gaming Console",
      price: 37499,
      image: "https://images.unsplash.com/photo-1486401899868-0e435ed85128?w=400&h=300&q=80",
      category: "Gaming",
      isNew: true,
    },
    {
      id: 6,
      name: "Smart Watch",
      price: 14999,
      image: "https://images.unsplash.com/photo-1579586337278-3befd40fd17a?w=400&h=300&q=80",
      category: "Wearables",
      isNew: false,
    },
    {
      id: 7,
      name: "Mechanical Keyboard",
      price: 9699,
      image: "https://images.unsplash.com/photo-1511467687858-23d96c32e4ae?w=400&h=300&q=80",
      category: "Accessories",
      isNew: true,
    },
    {
      id: 8,
      name: "Noise Cancelling Headphones",
      price: 22499,
      image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=300&q=80",
      category: "Accessories",
      isNew: false,
    },
    {
      id: 9,
      name: "Fitness Tracker",
      price: 13499,
      image: "https://images.unsplash.com/photo-1557166983-5939644443a3?w=400&h=300&q=80",
      category: "Wearables",
      isNew: true,
    },
    {
      id: 10,
      name: "Tablet Pro",
      price: 67499,
      image: "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=400&h=300&q=80",
      category: "Tablet",
      isNew: false,
    },
    {
      id: 11,
      name: "Drone Camera",
      price: 97499,
      image: "https://images.unsplash.com/photo-1508614589041-895b88991e3e?w=400&h=300&q=80",
      category: "Gadgets",
      isNew: true,
    },
    {
      id: 12,
      name: "Portable Speaker",
      price: 7499,
      image: "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=400&h=300&q=80",
      category: "Accessories",
      isNew: false,
    },
    {
      id: 13,
      name: "VR Headset",
      price: 29999,
      image: "https://images.unsplash.com/photo-1622979135225-d2ba269cf1ac?w=400&h=300&q=80",
      category: "Gaming",
      isNew: true,
    },
    {
      id: 14,
      name: "Desktop Monitor",
      price: 18699,
      image: "https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=400&h=300&q=80",
      category: "Computer",
      isNew: false,
    },
    {
      id: 15,
      name: "Wireless Mouse",
      price: 3699,
      image: "https://images.unsplash.com/photo-1615663245857-ac93bb7c39e7?w=400&h=300&q=80",
      category: "Accessories",
      isNew: true,
    },
    {
      id: 16,
      name: "Electric Scooter",
      price: 52499,
      image: "https://images.unsplash.com/photo-1604868189265-c6de9e333fd1?w=400&h=300&q=80",
      category: "Transport",
      isNew: false,
    },
    {
      id: 17,
      name: "Smart Light Bulb",
      price: 1899,
      image: "https://images.unsplash.com/photo-1550985616-10810253b84d?w=400&h=300&q=80",
      category: "Home",
      isNew: true,
    },
    {
      id: 18,
      name: "Gaming Chair",
      price: 26299,
      image: "https://images.unsplash.com/photo-1598550476439-6847785fcea6?w=400&h=300&q=80",
      category: "Furniture",
      isNew: false,
    },
    {
      id: 19,
      name: "E-Reader",
      price: 8999,
      image: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=400&h=300&q=80",
      category: "Gadgets",
      isNew: true,
    },
    {
      id: 20,
      name: "Bluetooth Adapter",
      price: 2599,
      image: "https://images.unsplash.com/photo-1655719789366-8dbb04e30363?w=400&h=300&q=80",
      category: "Accessories",
      isNew: false,
    },
  ];

  // Get unique categories
  const categories = useMemo(() => {
    const cats = [...new Set(products.map(p => p.category))];
    return ["all", ...cats];
  }, []);

  // Function to filter and sort products
  const filteredAndSortedProducts = useMemo(() => {
    let result = [...products];
    
    // Apply category filter
    if (selectedCategory !== "all") {
      result = result.filter(p => p.category === selectedCategory);
    }

    // Apply sorting
    switch (filter) {
      case "priceLowToHigh":
        return result.sort((a, b) => a.price - b.price);
      case "priceHighToLow":
        return result.sort((a, b) => b.price - a.price);
      case "newest":
        return result.sort((a, b) => a.isNew === b.isNew ? 0 : a.isNew ? -1 : 1);
      default:
        return result;
    }
  }, [filter, selectedCategory]);

  // Helper function to format price in Indian Rupees
  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(price);
  };

  return (
    <div className="min-h-[100vh] bg-gray-100 p-[24px]">
      <div className="max-w-[1200px] mx-auto">
        {/* Filters Section */}
        <div className="flex justify-between items-center mb-[24px] flex-wrap gap-4">
          {/* Category Filter */}
          <div className="flex gap-2 flex-wrap">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-full transition-all ${
                  selectedCategory === category
                    ? "bg-blue-500 text-white"
                    : "bg-white text-gray-700 hover:bg-blue-50"
                }`}
              >
                {category.charAt(0).toUpperCase() + category.slice(1)}
              </button>
            ))}
          </div>

          {/* Sort Filter */}
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="px-[12px] py-[8px] border border-gray-300 rounded-[8px] focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer bg-white"
          >
            <option value="default">Default</option>
            <option value="priceLowToHigh">Price: Low to High</option>
            <option value="priceHighToLow">Price: High to Low</option>
            <option value="newest">Newest</option>
          </select>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-[24px]">
          {filteredAndSortedProducts.map((product) => (
            <ProductCard 
              key={product.id} 
              product={product}
              isHovered={hoveredProduct === product.id}
              onHover={() => setHoveredProduct(product.id)}
              onLeave={() => setHoveredProduct(null)}
              formatPrice={formatPrice}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

const ProductCard = ({ product, isHovered, onHover, onLeave, formatPrice }) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);

  const handleAddToCart = () => {
    alert(`Added ${product.name} to cart!`);
  };

  return (
    <div 
      className={`bg-white p-[16px] rounded-[12px] shadow-md transition-all duration-300 ${
        isHovered ? 'shadow-xl transform -translate-y-1' : ''
      }`}
      onMouseEnter={onHover}
      onMouseLeave={onLeave}
    >
      <div className="relative overflow-hidden rounded-[8px] mb-[12px]">
        {!imageLoaded && !imageError && (
          <div className="absolute inset-0 bg-gray-200 animate-pulse" />
        )}
        <img
          src={imageError ? `https://via.placeholder.com/400x300/cccccc/666666?text=${encodeURIComponent(product.name)}` : product.image}
          alt={product.name}
          loading="lazy"
          className={`w-full h-[200px] object-cover transition-transform duration-300 ${
            isHovered ? 'scale-105' : ''
          } ${!imageLoaded ? 'opacity-0' : 'opacity-100'}`}
          onLoad={() => setImageLoaded(true)}
          onError={() => setImageError(true)}
        />
        {product.isNew && (
          <span className="absolute top-2 right-2 bg-green-500 text-white px-[8px] py-[4px] rounded-[4px] text-[12px]">
            New
          </span>
        )}
      </div>
      <div className="space-y-2">
        <h2 className="text-[18px] font-[500] text-gray-800">{product.name}</h2>
        <p className="text-[16px] font-bold text-blue-600">{formatPrice(product.price)}</p>
        <p className="text-[14px] text-gray-500">{product.category}</p>
        <button
          onClick={handleAddToCart}
          className="w-full bg-blue-500 text-white py-2 rounded-[6px] hover:bg-blue-600 transition-colors duration-200"
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default Home;
