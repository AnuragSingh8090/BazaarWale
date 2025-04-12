import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import ScrollToTop from '../../components/ScrollToTop/ScrollToTop'
import "./Wishlist.css";

const Wishlist = () => {
  const [wishlistItems, setWishlistItems] = useState([]);
  const [loading, setLoading] = useState(true);
  

  
  // Sample wishlist items with real product images
  useEffect(() => {
    // Simulate API fetch
    setTimeout(() => {
      setWishlistItems([
        {
          id: 1,
          name: "iPhone 15 Pro Max",
          price: 149999,
          image: "https://m.media-amazon.com/images/I/61L1ItFgFHL.jpg",
          inStock: true,
          discount: "10% off",
          size: "128GB",
          color: "Titanium Blue",
          category: "Electronics",
          dateAdded: "Dec 5, 2023"
        },
        {
          id: 2,
          name: "boAt Airdopes 161 with 40 Hours Playback",
          price: 999,
          image: "https://m.media-amazon.com/images/I/61eDXs9QFNL.jpg",
          inStock: true,
          size: "One Size",
          color: "White",
          category: "Electronics",
          dateAdded: "Dec 1, 2023"
        },
        {
          id: 3,
          name: "Apple MacBook Air Laptop M2 chip",
          price: 89990,
          image: "https://m.media-amazon.com/images/I/61bX2AoGj2L.jpg",
          inStock: false,
          size: "13.6 inch",
          color: "Silver",
          category: "Electronics",
          dateAdded: "Nov 20, 2023"
        },
        {
          id: 4,
          name: "JBL Flip 5 Wireless Portable Bluetooth Speaker",
          price: 8999,
          image: "https://m.media-amazon.com/images/I/71WNWq6hLxL.jpg",
          inStock: true,
          discount: "20% off",
          size: "Medium",
          color: "Black",
          category: "Electronics",
          dateAdded: "Nov 15, 2023"
        }
      ]);
      setLoading(false);
    }, 800);
  }, []);

  // Function to handle removing item from wishlist
  const handleRemoveFromWishlist = (itemId) => {
    setWishlistItems(wishlistItems.filter(item => item.id !== itemId));
  };

  // Function to handle moving item to cart
  const handleMoveToCart = (itemId) => {
    // In a real application, this would add the item to cart
    console.log(`Item ${itemId} moved to cart`);
  };

  // Function to format price in Indian Rupees
  const formatPrice = (price) => {
    return `₹${price.toLocaleString('en-IN')}`;
  };

  return (
    <div className="min-h-screen bg-gray-50 py-4 px-2 sm:px-4 lg:px-6">
      <ScrollToTop/>
      <div className="max-w-4xl mx-auto">
        <h1 className="text-2xl font-bold text-gray-900 mb-6">My Wishlist</h1>
        
        {loading ? (
          <div className="text-center py-8">
            <div className="inline-block animate-spin text-[var(--primary)] mb-4">
              <i className="fa-solid fa-circle-notch text-3xl"></i>
            </div>
            <p>Loading your wishlist...</p>
          </div>
        ) : wishlistItems.length === 0 ? (
          <div className="bg-white rounded-lg shadow p-6 text-center">
            <div className="flex justify-center mb-4">
              <i className="fa-solid fa-heart text-4xl text-gray-400"></i>
            </div>
            <h2 className="text-xl font-semibold text-gray-700 mb-2">Your Wishlist is Empty</h2>
            <p className="text-gray-500 mb-4">Save items you love for future shopping.</p>
            <Link 
              to="/" 
              className="inline-block bg-[var(--primary)] text-white px-4 py-2 rounded-md hover:bg-[#007ab3] transition-colors cursor-pointer"
            >
              Start Shopping
            </Link>
          </div>
        ) : (
          <div className="space-y-3">
            {wishlistItems.map(item => (
              <div key={item.id} className="bg-white rounded-md shadow-sm overflow-hidden border border-gray-100 transform transition-transform duration-300 hover:shadow-md hover:scale-[1.01]">
                <div className="p-3 border-b border-gray-200">
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="text-xs text-gray-500">Added on {item.dateAdded}</p>
                    </div>
                    <div className="text-xs text-gray-500">
                      {item.category}
                    </div>
                  </div>
                </div>
                
                <div className="p-3 flex items-center">
                  {/* Image - Fixed size */}
                  <div className="flex-shrink-0 w-16 h-16 bg-gray-100 rounded overflow-hidden mr-3">
                    <img 
                      src={item.image} 
                      alt={item.name}
                      className="w-full h-full object-contain"
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = "https://via.placeholder.com/150";
                      }}
                    />
                  </div>
                  
                  {/* Product Info */}
                  <div className="flex-1 min-w-0">
                    <h3 className="text-sm font-medium text-gray-900 truncate">{item.name}</h3>
                    <p className="text-xs text-gray-500 mt-0.5">
                      {item.size && <span className="mr-2">Size: {item.size}</span>}
                      {item.color && <span>Color: {item.color}</span>}
                    </p>
                    <div className="mt-1 flex items-center gap-3">
                      <span className={`text-xs ${item.inStock ? 'text-green-600' : 'text-red-600'}`}>
                        {item.inStock ? 'In Stock' : 'Out of Stock'}
                      </span>
                      {item.discount && (
                        <span className="text-xs text-green-600">
                          {item.discount}
                        </span>
                      )}
                    </div>
                    <div className="mt-1 text-sm font-medium text-[var(--primary)]">
                      {formatPrice(item.price)}
                    </div>
                  </div>
                  
                  {/* Heart Icon - Right side */}
                  <div className="ml-3 flex-shrink-0">
                    <button 
                      onClick={() => handleRemoveFromWishlist(item.id)}
                      className="text-red-500 hover:text-red-700 transition-colors p-2"
                      aria-label="Remove from wishlist"
                    >
                      <i className="fa-solid fa-heart text-xl"></i>
                    </button>
                  </div>
                </div>
                
                <div className="p-3 bg-gray-50 flex justify-between items-center">
                  <div className="text-xs text-gray-600">
                    {item.inStock ? 
                      "Available for delivery" : 
                      "Currently out of stock"}
                  </div>
                  
                  <button 
                    onClick={() => handleMoveToCart(item.id)}
                    disabled={!item.inStock}
                    className={`px-3 py-1 rounded text-xs flex items-center gap-1 ${
                      item.inStock 
                        ? 'bg-[var(--primary)] text-white hover:bg-[#007ab3] cursor-pointer' 
                        : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                    }`}
                  >
                    <i className="fa-solid fa-shopping-cart mr-1"></i>
                    <span>Add to Cart</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Wishlist; 